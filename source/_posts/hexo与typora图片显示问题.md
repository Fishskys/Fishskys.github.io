---
title: hexo与typora图片显示问题
typora-root-url: hexo与typora图片显示问题
date: 2023-06-30 14:51:31
updated:
categories:
- Hexo
tags:
- hexo
- typora
- 图片显示
---

可以说是困扰了将近两年的问题，终于被解决了！

<!--more-->

在我昨天开始写重拾hexo这篇博客的时候，我提到了这个图片显示问题，主要原因是**二者相对路径不统一**。

在旧hexo2上，大多博主采用下载插件方式解决问题，即hexo-asset-image的方式，但随着hexo的更新，hexo-asset-image已经失效，而且官方给出新的嵌入图片的方式。

<img src="image-20230630150252331.png" alt="image-20230630150252331" style="zoom: 67%;" />

经我几番查找，终于找到一个完美的解决方案[hexo博客如何插入图片 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/265077468)

首先，按照官方方式将post_asset_folder设置为true，这会使hexo创建新文章时同时在相同目录下创建同名文件夹。

然后在typore的偏好设置中这样设置：

<img src="image-20230630150637228.png" alt="image-20230630150637228" style="zoom:67%;" />

这样，在插入图片时就会放入hexo生成的那个文件夹中了。

最后，在typora-格式-图像-设置图片根目录为hexo生成的文件夹，就能保持hexo和typora二者相对路径保持一致了，完美！

每个文件都要手动设置根目录是绝对不行的，在最后一步中，我们可以发现，设置完根目录后，只是在md文件的开头部分新增了typora-root-url: 根目录，因此，我们可以将其添加进模板中，即进入scaffolds文件夹，进入post.md，添加一行

```
typora-root-url: {{ title }}
```

至此，算是彻底解决了这个长久以来的问题。

---

发现了个小问题，在直接复制时，typora总会在路径保留一个“/”，不去掉的话，在hexo上无法预览，下面就是一个例子。

<img src="/usb-1688110147484.jpg" alt="usb" style="zoom:67%;" />