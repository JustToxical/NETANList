export default {
    props: {
        verifier: { type: String, required: true },
        publisher: { type: String, required: true },
    },
    template: `
        <div class="level-authors">
            <div class="type-title-sm">First Victor</div>
            <p class="type-body"><span>{{ verifier }}</span></p>
            <div class="type-title-sm">Publisher</div>
            <p class="type-body"><span>{{ author }}</span></p>
        </div>
    `,
};
