import { WorkerEntrypoint } from 'cloudflare:workers';

export default class extends WorkerEntrypoint {
	async fetch(request: Request): Promise<Response> {
		return new Response('hello from worker one');
	}
	add(a: number, b: number): number {
		return a + b;
	}
}
