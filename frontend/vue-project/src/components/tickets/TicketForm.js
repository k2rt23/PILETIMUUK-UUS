export default {
  name: "TicketForm",
  props: {
    id: Number,
    title: String,
    description: String,
    priority: String,
    status: String
  },
  data() {
    return {
      ticket: {
        id: this.id || null,
        title: this.title || "",
        description: this.description || "",
        priority: this.priority || "Low",
        status: this.status || "Open"
      }
    };
  },
  methods: {
    saveTicket() {
      // Emit the ticket object when saving
      this.$emit("save", this.ticket);
    }
  }
};
