<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Card from './Card.svelte';
</script>

<Meta
  title="NOBA/Card"
  component={Card}
  argTypes={{
    text1: { control: 'text' },
    text2: { control: 'text' },
  }}
/>

<Template let:args>
  <Card {...args} />
</Template>

<Story
  name="Primary"
  args={{
    text1: 'hi',
    text2: '33',
  }}
/>
