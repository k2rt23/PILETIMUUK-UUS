export default {
  template:
    `
    <div class="modal fade" id="confirmationModal" aria-hidden="true" aria-labelledby="confirmationModalLabel" tabindex="-1">

        <div class="modal-dialog modal-dialog-centered">
        
            <div class="modal-content">

                <div class="modal-header">
                
                    <h1 class="modal-title fs-5" id="confirmationModalLabel">
                    Are you sure you want to delete this ticket?
                    </h1>

                    <button type="button" class="btn-close" :data-bs-target="target" aria-label="Close">
                    </button>

                </div>

                <div class="modal-body">
                
                    Deleting this ticket is irreversible. Please confirm your action.

                </div>

                <div class="modal-footer">

                    <button class="btn btn-danger" @click="$emit('confirmed')" data-bs-dismiss="modal">
                    YES, Delete
                    </button>

                    <button type="button" class="btn btn-secondary" :data-bs-target="target" data-bs-toggle="modal">
                    NO, Cancel
                    </button>

                </div>

            </div>

        </div>

    </div>
    `,
  props: { target: String },
  emits: ['confirmed']
}
