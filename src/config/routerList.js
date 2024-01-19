
/**
 * 1级没有component;
 * 2级的是layout，二级一定是layout。循环处理好的数据结构，给第二蹭增加layout
 * 3级是自己的文件路径，自己匹配；三级path不是全路径不可以带/
*/
/**
 * 1级路由;
 * 	没有component组件和字段；
 * 	meta必须有,title目前是必须；
 * 2级路由的component是layout组件;
 * 	path必须有
 * 	name必须有
 *  meta必须有
 * 	redirect重定向必须有，用来点击二级调转2级下第一个子路由
 * 3级路由是对应的组件路径；
 * 	path必须有
 * 	name必须有
 *  meta必须有
*/
export default {
	code: 0,
	data: {
		navigation: [
			{
				fatherNavigationId: '',
				navigationId: '1',
				meta: { title: '产品管理', icon: 'icon-chanpin1' }
			},
			{
				path: '/tab',
				name: 'tab',
				fatherNavigationId: '1',
				navigationId: '10101',
				component: 'layout',
				meta: { title: '二级出团游' },
				redirect: '/tab/index'
			},
			{
				path: 'index',
				name: 'tabIndex',
				fatherNavigationId: '10101',
				navigationId: '101001',
				component: '/tab/index',
				meta: { title: '出团首页' }
			},
			{
				path: 'list',
				name: 'tabList',
				fatherNavigationId: '10101',
				navigationId: '101001',
				component: '/tab/list',
				meta: { title: '出团列表' }
			}
		],
		employeeList: [
			{
				accountId: '53586a78-d69a-4ae4-8fc8-43d2ee5699ce',
				address: '',
				birthday: '',
				businessType: 0,
				businessTypeName: '全部',
				callWorkPhone: '',
				companyId: 'd1cfea62-a6dc-467e-8577-fda908209d55',
				companyName: '新东方国际游学',
				createDate: '2023-11-21 14:11:29',
				createUserId: 'c3a79291-aac4-4107-951d-0e62c9178d72',
				createUserName: '吴志中',
				defaultUserFlag: '0',
				delFlag: 0,
				deptId: 'd1cfea62-a6dc-467e-8577-fda908209d55',
				deptName: '新东方国际游学',
				deptNameTotal: '新东方国际游学',
				email: 'sunshuainan@xdf.cn',
				emailPrefix: 'sunshuainan',
				emailSuffix: '@xdf.cn',
				employeeCode: 'UXDF000092',
				employeeEnName: '',
				employeeId: 'e4fdeb22-8e79-4791-bcb7-63c964867fab',
				employeeName: '孙帅男',
				employeeStatus: '1',
				enableDblClickFlag: 1,
				enableRightFlag: 1,
				gender: '男',
				idNo: '',
				lastModifiedDate: '2023-11-21 14:11:29',
				lastModifiedUserId: 'c3a79291-aac4-4107-951d-0e62c9178d72',
				lastModifiedUserName: '吴志中',
				mainFlag: 1,
				mobilePhone: '18000000000',
				officeHours: '',
				officePhone: '',
				outCallType: '1',
				photoPath: '',
				pollingUserFlag: '0',
				qq: '',
				roleId: 'bec13d7c-ea6f-4902-9cff-d17a84a078f7',
				roleName: '管理员（新）',
				roleNameTotal: '管理员（新）',
				topCompanyId: 'd1cfea62-a6dc-467e-8577-fda908209d55',
				topCompanyName: '新东方国际游学',
				weChat: '',
				webCallPhone: ''
			},
			{
				accountId: '53586a78-d69a-4ae4-8fc8-43d2ee5699ce',
				address: '',
				birthday: '',
				businessType: 0,
				businessTypeName: '全部',
				callWorkPhone: '',
				companyId: 'f21220d1-b353-42f9-ad6b-d07cfa67b83b',
				companyName: '国际游学&营地教育管理中心',
				createDate: '2023-11-24 17:28:11',
				createUserId: '15d76c94-4ecb-4bd6-bbdb-46c0d9376ef7',
				createUserName: '张佩佩',
				defaultUserFlag: '1',
				delFlag: 0,
				deptId: 'f21220d1-b353-42f9-ad6b-d07cfa67b83b',
				deptName: '国际游学&营地教育管理中心',
				deptNameTotal: '国际游学&营地教育管理中心',
				email: 'sunshuainan@xdf.cn',
				emailPrefix: 'sunshuainan',
				emailSuffix: '@xdf.cn',
				employeeCode: 'DFUceb000008',
				employeeEnName: '',
				employeeId: '11d9d37e-0ca6-4566-b788-d1046e673b3c',
				employeeName: '孙帅男（中心）',
				employeeStatus: '1',
				enableDblClickFlag: 1,
				enableRightFlag: 1,
				gender: '男',
				idNo: '',
				lastModifiedDate: '2023-11-24 17:28:34',
				lastModifiedUserId: '15d76c94-4ecb-4bd6-bbdb-46c0d9376ef7',
				lastModifiedUserName: '张佩佩',
				mainFlag: 1,
				mobilePhone: '17788559658',
				officeHours: '',
				officePhone: '',
				outCallType: '1',
				photoPath: '',
				pollingUserFlag: '0',
				qq: '',
				roleId: 'bec13d7c-ea6f-4902-9cff-d17a84a078f7',
				roleName: '管理员（新）',
				roleNameTotal: '管理员（新）',
				topCompanyId: 'd1cfea62-a6dc-467e-8577-fda908209d55',
				topCompanyName: '新东方国际游学',
				weChat: '',
				webCallPhone: ''
			},
			{
				accountId: '53586a78-d69a-4ae4-8fc8-43d2ee5699ce',
				address: '',
				birthday: '',
				businessType: 0,
				businessTypeName: '全部',
				callWorkPhone: '',
				companyId: '9092fa5c-06ba-40cb-ac2c-e88ca595d45d',
				companyName: '辛巴旅行',
				createDate: '2023-12-01 15:36:46',
				createUserId: 'cf9ee233-13a9-4a73-9a1a-9d59891cc9f9',
				createUserName: '张佩佩',
				defaultUserFlag: '0',
				delFlag: 0,
				deptId: '9092fa5c-06ba-40cb-ac2c-e88ca595d45d',
				deptName: '辛巴旅行',
				deptNameTotal: '辛巴旅行',
				email: 'sunshuainan@xdf.cn',
				emailPrefix: 'sunshuainan',
				emailSuffix: '@xdf.cn',
				employeeCode: 'DFUXB000016',
				employeeEnName: '',
				employeeId: '00f00419-6e52-40f7-8c0e-be5470c9dbeb',
				employeeName: '孙帅男（辛巴）',
				employeeStatus: '1',
				enableDblClickFlag: 1,
				enableRightFlag: 1,
				gender: '男',
				idNo: '',
				lastModifiedDate: '2023-12-01 15:36:46',
				lastModifiedUserId: 'cf9ee233-13a9-4a73-9a1a-9d59891cc9f9',
				lastModifiedUserName: '张佩佩',
				mainFlag: 1,
				mobilePhone: '18855669856',
				officeHours: '',
				officePhone: '',
				outCallType: '1',
				photoPath: '',
				pollingUserFlag: '0',
				qq: '',
				roleId: 'bec13d7c-ea6f-4902-9cff-d17a84a078f7',
				roleName: '管理员（新）',
				roleNameTotal: '管理员（新）',
				topCompanyId: 'd1cfea62-a6dc-467e-8577-fda908209d55',
				topCompanyName: '新东方国际游学',
				weChat: '',
				webCallPhone: ''
			}
		],
		curEmployee: {
			companyId: 'f21220d1-b353-42f9-ad6b-d07cfa67b83b',
			companyName: '国际游学&营地教育管理中心',
			deptId: 'f21220d1-b353-42f9-ad6b-d07cfa67b83b',
			deptName: '国际游学&营地教育管理中心',
			employeeId: '11d9d37e-0ca6-4566-b788-d1046e673b3c',
			employeeName: '孙帅男（中心）'
		},
		adminFlag: '1'
	},
	msg: '数据操作成功'
};
