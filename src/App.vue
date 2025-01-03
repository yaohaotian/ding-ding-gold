<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ComponentName',
  setup(props, ctx) {
    return () => <router-view />
  }
})
</script>

<style lang="less" scoped>
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
