<script lang="ts" setup>
import BaseButton from '@/components/UI/BaseButton.vue'
import BaseInput from '@/components/UI/BaseInput.vue'
import BaseDateInput from '@/components/UI/BaseDateInput.vue'
import AIcon from '@/components/UI/AIcon.vue'
import { ref } from 'vue'
import { Token } from '@/lib/apis'
import { useRoute } from 'vue-router'
import { getEventId } from '@/lib/parsePathParams'
import EmoineIcon from '@/components/UI/EmoineIcon.vue'
import { Timestamp } from '@bufbuild/protobuf'
import { useAdminConnectClient } from '@/lib/connectClient'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'addNewToken', token: Token): void
}>()

const adminClient = useAdminConnectClient()

const route = useRoute()
const eventId = getEventId(route.params.eventId)

const userName = ref('')
const description = ref('')
const expireDate = ref('')

const handleAddToken = async () => {
  // todo: error handling
  const res = await adminClient.generateToken({
    username: userName.value,
    eventId: eventId,
    expireAt: Timestamp.fromDate(new Date(expireDate.value + ':00Z')), // fixme: https://github.com/traPtitech/traPortfolio-Dashboard/pull/64#discussion_r1174958146
    description: description.value
  })
  if (!res.token) throw new Error('response.token is undefined')
  userName.value = ''
  description.value = ''
  expireDate.value = ''
  emit('addNewToken', res.token)
}
</script>

<template>
  <div :class="$style.container">
    <emoine-icon />
    <div :class="$style.formContainer">
      <base-input v-model="userName" placeholder="ユーザー名を入力" />
      <base-input
        v-model="description"
        placeholder="説明文を入力"
        :class="$style.description"
      />
      <base-date-input v-model="expireDate" />
    </div>
    <div :class="$style.buttonContainer">
      <base-button type="primary" @click="handleAddToken">保存</base-button>
      <base-button type="secondary" @click="emit('close')">
        <a-icon name="basil:cross-solid" />
      </base-button>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 3.75rem;
  padding: 8px;
}
.formContainer {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex-grow: 1;
  border-right: 1px solid $color-secondary;
  height: 70%;
  padding-right: 20px;
  margin-left: 1.25rem;
}
.description {
  flex-grow: 1;
}
.buttonContainer {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0 1.25rem;
  height: 70%;
}
</style>
