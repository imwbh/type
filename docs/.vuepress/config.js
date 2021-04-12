module.exports = {
    title: 'Type Pages',
    description: 'Type My Pages',
    themeConfig: {
        //logo: '/avatar.png',  // 左上角logo
        nav:[ // 导航栏配置
          {text: '首页', link: '/' },
          {text: 'STM32', link: '/STM32/' },
          {text: '树莓派', link: '/RaspberryPi/' },
          {text: '运放电路', link: '/OPA/' },
          {text: 'PCB', link: '/PCB/' },
          {text: '友链', link: '/links'}      
        ],
        sidebar: {
            
            '/RaspberryPi/':getRPSidebar('树莓派'),
            '/STM32/':getSTM32Sidebar('STM32'),
            '/OPA/':getOPASidebar('运放电路'),
            '/PCB/':getPCBSidebar('PCB'),
        },
        lastUpdated: 'Last Updated', // string | boolean
        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        //repo: 'imwbh/stm32',
        // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
        // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
        //repoLabel: 'Repo',
        // 以下为可选的编辑链接选项
        // 假如你的文档仓库和项目本身不在一个仓库：
        //docsRepo: 'vuejs/vuepress',
        // 假如文档不是放在仓库的根目录下：
        docsDir: 'docs',
        // 假如文档放在一个特定的分支下：
        docsBranch: 'main',
        // 默认是 false, 设置为 true 来启用
        editLinks: true,
        // 默认为 "Edit this page"
        editLinkText: 'Edit on Github',
        smoothScroll: true,
    },
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        '/': {
          lang: 'zh', // 将会被设置为 <html> 的 lang 属性
        }
      }
}



function getRPSidebar (groupA) {
    return [
        {
        title: groupA,
        collapsable: false,
        children: [
            ''
        ]
        }
    ]
}

function getSTM32Sidebar(groupA) {
    return [
        {
        title: groupA,
        collapsable: false,
        children: [
            ''
        ]
        }
    ]
}

function getOPASidebar (groupA) {
    return [
        {
        title: groupA,
        collapsable: false,
        children: [
            '',
            '001-install',
            '002-basic-use',
            '003-LM741',
        ]
        }
    ]
}

function getPCBSidebar (groupA) {
    return [
        {
        title: groupA,
        collapsable: false,
        children: [
            ''
        ]
        }
    ]
}
