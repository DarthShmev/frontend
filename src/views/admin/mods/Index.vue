<template>
    <list service-id="mods@getAll" :fields="listFields" searchable>
        <template #search-extra>
            <div class="ml-4">
                <v-button color="primary" permission="mod.create" :to="{ name: 'admin.service_management.mods.new' }">
                    <t path="generic.create" />
                </v-button>
            </div>
        </template>

        <template #field-name="{ result }">
            <v-button class="text-white/75" permission="mod.read" :to="{ name: 'admin.service_management.mods.manage', params: { mod: result.id } }">
                {{ result.name }}
            </v-button>
        </template>
    </list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        return {
            listFields: <ListField[]>[
                { key: 'id', features: ['code'], skeleton: 4 },
                { key: 'name', skeleton: 8 },
                { key: 'category', skeleton: '8' },
                { key: 'version', features: ['code'], skeleton: 6 },
                { key: 'description', skeleton: 12 },
            ]
        };
    }
});
</script>
