import RequestService from './request';
import { Node } from '~/api/models';
import { Parser } from '~/api';

interface GetNodeDaemonInfoRequest {
    id: number;
}

interface UpdateNodeRequest {
    name: string;
    description?: string;
    public: boolean;
    display_fqdn?: string;
    behind_proxy: boolean;
    maintenance_node: boolean;
    location_id: number;

    cpu: number;
    cpu_overallocate?: number;
    memory: number;
    memory_overallocate?: number;
    disk: number;
    disk_overallocate?: number;

    upload_size: number;
    daemonListen: number;
    daemonSFTP: number;
    daemonFastdl: number;
}

export interface NodeDaemonInfo {
    alive: boolean;
    version: string;
    system: {
        type: string;
        arch: string;
        kernel: string;
        cpus: number;
    }
}

class NodeService {
    getAll(req: PaginatableRequest): Promise<Node[]> {
        return RequestService.get('/nodes', {
            ...req,
            include: ['location', 'servers_count']
        })
            .then(Parser.parse);
    }

    get(): Promise<Node> {
        return RequestService.get('/nodes/:node', {
            include: 'location'
        })
            .then(Parser.parse);
    }

    update(data: UpdateNodeRequest): Promise<Node> {
        return RequestService.put('/nodes/:node', data)
            .then(Parser.parse)
            .then(RequestService.updateModelBinding);
    }

    delete(): Promise<void> {
        return RequestService.delete('/nodes/:node');
    }

    daemonInfo(data: GetNodeDaemonInfoRequest): Promise<NodeDaemonInfo> {
        return RequestService.get(`/nodes/${data.id}/daemon-info`);
    }
}

export default new NodeService();
