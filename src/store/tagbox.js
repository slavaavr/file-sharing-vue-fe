import axios from "@/axios/axios-common"

export default {
    state: {
        basicTags: []
    },
    actions: {
        async getPopularTags() {
            const tags = await axios.get('/popularTags');
            return tags.data;
        }
    }
}