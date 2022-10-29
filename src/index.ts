export interface Env {
	LINKS: KVNamespace;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;

		if (path === '/') {
			return new Response("Hello, world!");
		}

		// The original Lessn uses Base36 in the short URLs but stores them in the database
		// as regular Base10: https://github.com/shauninman/Lessn/blob/master/index.php#L11
		const itemId = parseInt(path.substring(1), 36).toString(10);

		const item = await env.LINKS.get(itemId);

		if (item === null) {
			console.error('Failed to find item with path ' + path);

			return new Response('Not found', {
				status: 404,
			});
		}

		return Response.redirect(item, 302);
	},
};
