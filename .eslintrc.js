module.exports = {
	extends: [
		'@desaiuditd/eslint-config/javascript',
		'@desaiuditd/eslint-config/typescript',
		'@desaiuditd/eslint-config/react',
	],
	rules: {
		'import/no-unresolved': [
			'error',
			{
				ignore: [
					'^react$',
					'^react-dom/client$',
				],
			},
		],
	},
};
