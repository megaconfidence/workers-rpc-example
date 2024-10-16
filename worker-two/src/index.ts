import { Env } from './types';

export default {
	async fetch(_request, env, _ctx): Promise<Response> {
		const res = await env.WORKER_ONE.add(1, 2);
		return new Response(String(res));
	},
} satisfies ExportedHandler<Env>;
