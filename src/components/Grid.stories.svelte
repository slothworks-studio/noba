<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import Grid from './Grid.svelte';
</script>

<Meta title="NOBA/Grid" component={Grid} argTypes={{}} />

<Template let:args><Grid {...args} /></Template>

<Story name="Primary" args={{}} />

<Story name="Secondary" args={{}} />
