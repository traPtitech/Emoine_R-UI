import { AdminAPIService } from '@/lib/apis/generated/proto/emoine_r/v1/admin_api_connect'
import { GeneralAPIService } from '@/lib/apis/generated/proto/emoine_r/v1/general_api_connect'
import { adminApiMock, generalApiMock } from '@/lib/mock'
import {
  PromiseClient,
  createPromiseClient,
  createRouterTransport
} from '@bufbuild/connect'
import { createConnectTransport } from '@bufbuild/connect-web'
import { ServiceType } from '@bufbuild/protobuf'

const ENABLE_MOCK = true

const connectMockTransport = (serviceType: ServiceType) =>
  createRouterTransport(
    ({ service }) => {
      switch (serviceType) {
        case GeneralAPIService:
          return service(GeneralAPIService, generalApiMock)
        case AdminAPIService:
          return service(AdminAPIService, adminApiMock)
        default:
          throw new Error('invalid service type')
      }
    },
    {
      transport: {
        baseUrl: 'http://localhost:8090'
      }
    }
  )
const connectTransport = createConnectTransport({
  baseUrl: 'http://localhost:8090'
})

const useConnectClient = <T extends ServiceType>(
  service: T
): PromiseClient<T> => {
  const transport = ENABLE_MOCK
    ? connectMockTransport(service)
    : connectTransport
  return createPromiseClient(service, transport)
}

export const useGeneralConnectClient = () => useConnectClient(GeneralAPIService)
export const useAdminConnectClient = () => useConnectClient(AdminAPIService)
