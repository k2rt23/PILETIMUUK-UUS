import confirmationModal from "./ConfirmationModal.js";
import ticketForm from "./TicketForm.js";
import ticketDetails from "./ticket/TicketDetails.js";

export default {
  template: `
        <div id="ticketInfoModal" class="modal" tabindex="-1">

            <div class="modal-dialog">

                <div class="modal-content">

                    <div class="modal-header">

                        <h1 class="modal-title">Ticket Info</h1>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>

                    </div>

                    <div class="modal-body">

                        <ticket-form 
                        v-if="isEditing" 
                        v-model:id="modifiedTicket.id" 
                        v-model:Title="modifiedTicket.Title" 
                        v-model:Description="modifiedTicket.Description" 
                        v-model:Priority="modifiedTicket.Priority" >
                        </ticket-form>

                        <ticket-details v-else :ticketInModal="ticketInModal">
                        </ticket-details>

                    </div>

                    <div class="modal-footer">

                        <div class="container">

                            <div class="row">

                                <template v-if="isEditing">

                                    <div class="col me-auto">

                                        <button type="button" 
                                        class="btn btn-danger" 
                                        data-bs-target="#confirmationModal" 
                                        data-bs-toggle="modal">
                                        Delete
                                        </button>

                                    </div>

                                    <div class="col-auto">

                                        <button type="button" 
                                        class="btn btn-success mx-2"
                                        @click="saveModifiedTicket"
                                        >Save
                                        </button>

                                        <button type="button" 
                                        class="btn btn-success mx-2"
                                        @click="cancelEditing"
                                        >Cancel
                                        </button>

                                    </div>

                                </template>

                                <template v-else>

                                    <div class="col me-auto"></div>

                                    <div class="col-auto">

                                        <button type="button" 
                                        class="btn btn-warning mx-2"
                                        @click="startEditing"
                                        >Edit
                                        </button>

                                        <button type="button" 
                                        class="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                        >Close ❌
                                        </button>

                                    </div>

                                </template>

                            </div>

                        </div>

                    </div>    

                </div>

            </div>

        </div>
        <confirmation-modal :target="'#ticketInfoModal'" @confirmed="deleteTicket"></confirmation-modal>
    `,
  components: {
    confirmationModal,
    ticketForm,
    ticketDetails
  },
  emits: ["ticketUpdated"],
  props: {
    ticketInModal: {}
  },
  data() {
    return {
      isEditing: false,
      modifiedTicket: {}
    }
  },
  methods: {
    startEditing() {
      this.modifiedTicket = { ...this.ticketInModal }
      this.isEditing = true
    },
    cancelEditing() {
      this.isEditing = false
    },
    async saveModifiedTicket() {
      console.log("currently saving: ", this.modifiedTicket)
      const rawResponse = await fetch(this.API_URL + "/tickets/" + this.modifiedTicket.id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.modifiedTicket)
      });
      console.log(rawResponse);
      this.$emit("ticketUpdated", this.modifiedTicket);
      this.isEditing = false
    },
    deleteTicket() {
      console.log("DELETE confirmed");
    }
  }
}
