import { PromiseClient, createPromiseClient } from '@bufbuild/connect'
import { createConnectTransport } from '@bufbuild/connect-web'
import { ServiceType } from '@bufbuild/protobuf'

const transport = createConnectTransport({
  baseUrl: 'http://localhost:8090'
})

export const useConnectClient = <T extends ServiceType>(
  service: T
): PromiseClient<T> => {
  return createPromiseClient(service, transport)
}
