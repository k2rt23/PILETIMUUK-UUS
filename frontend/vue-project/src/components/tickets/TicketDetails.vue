<template>
  <div>
    <h3>Ticket Details</h3>
    <p><strong>Title:</strong> {{ ticket.Title }}</p>
    <p><strong>Description:</strong> {{ ticket.Description }}</p>
    <p><strong>Priority:</strong> {{ ticket.Priority }}</p>
    <p><strong>Status:</strong> {{ ticket.Status }}</p>
  </div>
</template>

<script>
import TicketDetails from "./TicketDetails.js";

export default TicketDetails;
</script>

<style scoped>
  /* Add styles specific to ticket details if needed */
</style>
