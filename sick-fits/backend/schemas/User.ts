import { list } from '@keystone-next/keystone/schema';
import { text, password } from '@keystone-next/fields';

export const User = list({
	// access: ,
	// ui:,
	fields: {
		name: text({ isRequired: true }), // can add isIndexed to this config obj to index this field and make it nice and fast
		email: text({ isRequired: true, isUnique: true }),
		password: password(),
		// TODO: Add roles, cart, and orders
	},
});
