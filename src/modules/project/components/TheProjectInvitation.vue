<script lang="ts" setup></script>

<template>
  <PrimeCard
    :style="{
      width: '25rem',
      overflow: 'hidden',
      margin: 'auto'
    }">
    <template #header>
      <img :style="{
        width: '100%',
        display: 'block',
        height: '200px',
        objectFit: 'contain'
      }" alt="user header" src="/src/assets/images/invitation-min.png" />
    </template>

    <template #title>Advanced Card</template>

    <template #subtitle>Card subtitle</template>

    <template #content>
      <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam
        deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
        neque
        quas!
      </p>
    </template>

    <template #footer>
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '.5rem'
        }"
      >
      <PButton label="Cancel" severity="secondary" outlined class="w-full" />
      <PButton label="Save" class="w-full" />
      </div>
    </template>
  </PrimeCard>
</template>