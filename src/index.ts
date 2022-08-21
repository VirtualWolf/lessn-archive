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

		const item = await env.LINKS.get(path.substring(1));

		if (item === null) {
			return new Response('Not found', 404);
		}

		return Response.redirect(item, 302);
	},
};
