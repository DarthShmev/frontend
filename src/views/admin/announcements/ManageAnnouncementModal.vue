<template>
    <modal
        :title="`admin.announcements.${announcement ? 'edit_announcement' : 'create_announcement'}`"
        opener-color="primary"
        :opener-text="announcement ? 'generic.edit' : 'generic.create'"
        :permission="announcement ? 'announcement.update' : 'announcement.create'"
        v-slot="{ close }"
    >
        <v-form :service-id="submit" :on-success="() => { updateList(); close(); }">
            <v-select
                name="type"
                rule="required"
                prefix="generic"
                :options="allowedTypes"

                :value="announcement?.type ?? 'success'"
            />

            <v-input name="text" label="components.form.fields.content" rule="required" :value="announcement?.text ?? ''" />

            <v-switch name="active" label="components.form.fields.enabled" footer="admin.announcements.enabled_footer" :value="announcement?.active ?? true" />

            <div class="text-right">
                <v-submit color="primary">
                    <t :path="announcement ? 'generic.edit' : 'generic.create'" />
                </v-submit>
            </div>
        </v-form>
    </modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { dispatch } from '~/core';
import { Announcement } from '~/api/models';
import { useService } from '~/plugins';

export default defineComponent({
    props: {
        announcement: {
            type: Announcement,
        }
    },
    setup(props) {
        const allowedTypes = ['success', 'info', 'warning', 'danger'];

        return {
            allowedTypes,

            updateList: () => dispatch('lists/refresh', 'announcements@getAll'),
            submit: (data: Record<string, any>) => useService(`announcements@${props.announcement ? 'update' : 'create'}`, true, {
                ...(props.announcement ? { id: props.announcement.id } : {}),
                ...data,
            }),
        };
    },
});
</script>
