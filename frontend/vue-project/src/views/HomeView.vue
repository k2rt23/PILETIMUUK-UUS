<script>
import TicketsTable from '../components/TicketsTable.vue';

export default {
    components: { TicketsTable },
    data() {
        return {
            allTickets: []
        };
    },
    async created() {
        this.allTickets = await (await fetch('http://localhost:8080/tickets')).json();
    }
}
</script>

<template>
    <main>
        <TicketsTable :items="allTickets" />
    </main>
</template>