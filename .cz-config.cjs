module.exports = {
  types: {
    feat: {
      description: '新增功能，迭代项目需求',
      title: 'Features',
    },
    fix: {
      description: '修复缺陷',
      title: 'Bug Fixes',
    },
    refactor: {
      description: '重构代码，非新增功能也非修复缺陷',
      title: 'Code Refactoring',
    },
    perf: {
      description: '优化相关，比如提升性能、体验',
      title: 'Performance Improvements',
    },
    test: {
      description: '新增测试，追加测试用例验证代码',
      title: 'Tests',
    },
    style: {
      description: '代码格式修改, 注意不是 css 修改',
      title: 'Styles',
    },
    revert: {
      description: '回滚版本，撤销某次代码提交',
      title: 'Reverts',
    },
    merge: {
      description: '合并分支，合并分支代码到其他分支',
      title: 'Merges',
    },
    docs: {
      description: '更新文档，仅修改文档不修改代码',
      title: 'Documentation',
    },
    build: {
      description: '编译相关的修改，例如发布版本、对项目构建或者依赖的改动',
      title: 'Builds',
    },
    chore: {
      description: '其他修改, 比如改变构建流程、或者增加依赖库、工具等',
      title: 'Chores',
    },
    ci: {
      description: '更新脚本，改动CI或执行脚本配置',
      title: 'Continuous Integrations',
    },
  },
  messages: {
    type: '选择你要提交的更改类型:',
    scope: '此更改的范围是什么(例如组件或文件名)(可选):',
    customScope: '请输入自定义的更改范围(可选):',
    subject: '写一个简短的变更描述(必填):',
    body: '提供更详细的变更描述(可选按回车跳过):',
    breaking: '列出任何破坏性更改(可选按回车跳过):',
    footer: '列出此更改关闭的issues(可选按回车跳过):',
    confirmCommit: '确认提交上述内容?',
  },
  usePreparedCommit: false,
  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',
  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 100,
  scopes: [{ name: 'accounts' }, { name: 'admin' }, { name: 'exampleScope' }, { name: 'changeMe' }],
  // scopeOverrides: {
  //   fix: [
  //     { name: 'merge' },
  //     { name: 'style' },
  //     { name: 'e2eTest' },
  //     { name: 'unitTest' }
  //   ]
  // },
  // skipQuestions: ['scope', 'body'],
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
}
