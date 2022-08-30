export const text = {
    methods: {
        title() {
            if (this.$store.state.spanishState == true) {
                return 'PLACEHOLDER TEXT';
            } else {
                return 'Real-Time Flood Impact Map';
            }

        },

    }
}