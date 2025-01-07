<script>
export default {
    name: "TicketsTable",
    props: {
        items: Array // An array of ticket objects
    }
}
</script>

<template>
  <table class="table table-striped">
    <thead class="table-dark">
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Priority</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.TicketID">
        <td>{{ item.Title }}</td>
        <td>{{ item.Description }}</td>
        <td>{{ item.Priority }}</td>
        <td>{{ item.Status }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
</style>
