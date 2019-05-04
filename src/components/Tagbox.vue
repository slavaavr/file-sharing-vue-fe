<template>
    <v-combobox
            v-model="tags"
            :filter="filter"
            :hide-no-data="!searchTag"
            hide-selected
            :search-input.sync="searchTag"
            :items="basicTags"
            label="Type your tag"
            multiple
            small-chips
    >
        <template slot="no-data">
            <v-list-tile>
                <span class="subheading">Create</span>
                <v-chip
                        :color="`${colors[currColor]} lighten-3`"
                        label
                        small
                >
                    {{ searchTag }}
                </v-chip>
            </v-list-tile>
        </template>

        <template
                v-if="item === Object(item)"
                slot="selection"
                slot-scope="{ item, parent, selected }"
        >
            <v-chip
                    :color="`${item.color} lighten-3`"
                    :selected="selected"
                    label
                    small
            >
                <span class="pr-2">
                  {{ item.title }}
                </span>
                <v-icon
                        small
                        @click="parent.selectItem(item)"
                >close
                </v-icon>
            </v-chip>
        </template>

        <template
                slot="item"
                slot-scope="{ index, item }"
        >
            <v-list-tile-content>
                <v-chip
                        :color="`${item.color} lighten-3`"
                        dark
                        label
                        small
                >
                    {{ item.title }}
                </v-chip>
            </v-list-tile-content>
        </template>
    </v-combobox>
</template>

<script>
    export default {
        data() {
            return {
                colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
                currColor: 0,
                basicTags: [
                    {header: 'Select a tag or create one'},
                ],
                tags: [],
                searchTag: null
            }
        },
        watch: {
            tags(val, prev) {
                if (val.length === prev.length) return;

                this.tags = val.map(v => {
                    if (typeof v === 'string') {
                        v = this.addTag(v);
                    }
                    return v;
                });
                this.$store.dispatch('setTags', this.tags);
            }
        },
        methods: {
            filter(item, queryTitle, itemTitle) {
                if (item.header) return false;

                const hasValue = val => val != null ? val : '';

                const title = hasValue(itemTitle);
                const query = hasValue(queryTitle);

                return title.toString()
                    .toLowerCase()
                    .indexOf(query.toString().toLowerCase()) > -1
            },
            addTag(title) {
                const tag = {
                    title: title,
                    color: this.colors[this.currColor]
                };
                this.basicTags.push(tag);
                this.currColor = (this.currColor + 1) % this.colors.length;
                return tag;
            }
        },
        created() {
            this.$store.getters.basicTags.forEach(e => this.addTag(e));
        }
    }
</script>

<style scoped>

</style>