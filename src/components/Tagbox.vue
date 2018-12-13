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
                  {{ item.text }}
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
                slot-scope="{ index, item, parent }"
        >
            <v-list-tile-content>
                <v-chip
                        :color="`${item.color} lighten-3`"
                        dark
                        label
                        small
                >
                    {{ item.text }}
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
                    {
                        text: 'Foo',
                        color: 'blue'
                    },
                    {
                        text: 'Bar',
                        color: 'red'
                    }
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
                        v = {
                            text: v,
                            color: this.colors[this.currColor]
                        };
                        this.basicTags.push(v);
                        this.currColor = (this.currColor + 1) % this.colors.length;
                    }
                    return v;
                });
            }
        },
        methods: {
            filter(item, queryText, itemText) {
                if (item.header) return false;

                const hasValue = val => val != null ? val : '';

                const text = hasValue(itemText);
                const query = hasValue(queryText);

                return text.toString()
                    .toLowerCase()
                    .indexOf(query.toString().toLowerCase()) > -1
            }
        }
    }
</script>

<style scoped>

</style>