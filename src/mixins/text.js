export const text = {
    methods: { // If Spanish State is true then display Spanish text; if false display English
        title() {
            return this.$store.state.spanishState == true ? 'PLACEHOLDER FOR SPANISH TEXT' : 'Real-Time Flood Impact Map';
        },

    }
}