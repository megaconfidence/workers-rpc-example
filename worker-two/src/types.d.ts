import { WorkerEntrypoint } from 'cloudflare:workers';
export default class extends WorkerEntrypoint {
	add(a: number, b: number): number;
}

export interface Env {
	WORKER_ONE: Service<WorkerOne>;
}
