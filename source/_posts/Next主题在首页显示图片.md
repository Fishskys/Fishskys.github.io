---
title: Next主题在首页显示图片
typora-root-url: Next主题在首页显示图片
date: 2023-07-06 16:33:09
updated:
categories:
- Hexo
tags:
- hexo
- 图片显示
photos: Hexo/Next主题在首页显示图片/这是一张图片.bmp
---

 无意间发现的一种显示图片的方法。

<!--more-->

在尝试自定义菜单栏，然后打算模仿post-collapse文件写一个新模板时，发现它有一行是 `{{ post_gallery(post.photos) }}`（23行）

```html
  <article itemscope itemtype="http://schema.org/Article">
    <header class="post-header">
      <div class="post-meta-container">
        <time itemprop="dateCreated"
              datetime="{{ moment(post.date).format() }}"
              content="{{ date(post.date, config.date_format) }}">
          {{ date(post.date, 'MM-DD') }}
        </time>
      </div>

      <div class="post-title">
        {%- if post.link %}{# Link posts #}
          {%- set postTitleIcon = '<i class="fa fa-external-link-alt"></i>' %}
          {%- set postText = post.title or post.link %}
          {{ next_url(post.link, postText + postTitleIcon, {class: 'post-title-link post-title-link-external', itemprop: 'url'}) }}
        {% else %}
          <a class="post-title-link" href="{{ url_for(post.path) }}" itemprop="url">
            <span itemprop="name">{{ post.title or __('post.untitled') }}</span>
          </a>
        {%- endif %}
      </div>

      {{ post_gallery(post.photos) }}
    </header>
  </article>
```

于是猜想这是显示图片用的，但是具体图片的链接是什么呢，尝试着在文章头部加了一条新的属性photos，然后仿照在正文里插入图片的方法，写了图片的链接（正文里图片链接根目录为同名文件夹），即`photos: test.jpg`，但是意外的是，图片并没有正常显示。

我打开F12，定位到图片位置，发现为`img src = "/test.jpg"`，对比了一下正文后，我发现了问题所在。在Hexo处理之后，它会根据根目录下`_config.yml`里`permalink: :category/:title/`，来将内容放置在public文件夹下。按照我的设置，它是放置在`public/Hexo/Next主题在首页显示图片/`下，于是我修改链接为`Hexo/Next主题在首页显示图片/test.jpg`后，图片成功显示，效果如下：

<img src="image-20230706165412088.png" alt="image-20230706165412088" style="zoom:50%;" />

同样，图片在归档界面同样会显示，如果不想显示的话，可以在`blog\themes\next\layout\_macro\post-collapse.njk`中删去那一行。

值得一提的是，如果有每篇文章都显示图片的需求，可以在`blog\scaffolds\post.md`中加上photos这一行，但是，`photos: :categories/:title/test.jpg`这样的写法并不有效。