Page({
  data: {
    list: [{
        id: "jishu",
        name: "技术部",
        open: !1,
        contents: [{
          name: "p",
          attrs: {
            class: "rich-p"
          },
          children: [{
            type: "text",
            text: "技术部是俱乐部的核心部门，是俱乐部技术创新这一核心的主要担当。加入进来，我们会为你详解各种语言，帮你学习单片机、FPGA的开发技术。无论你是小白还是大神，我们总能帮你找到最适合你的路。"
          }]
        }, {
          name: "p",
          attrs: {
            class: "rich-p"
          },
          children: [{
            type: "text",
            text: "主要负责："
          }]
        }, {
          name: "ol",
          children: [{
            name: "li",
            children: [{
              type: "text",
              text: "组织俱乐部内部的技术培训和技术讲座；"
            }]
          }, {
            name: "li",
            children: [{
              type: "text",
              text: "组织俱乐部成员参与技术性竞赛；"
            }]
          }, {
            name: "li",
            children: [{
              type: "text",
              text: "组织和研究生部以及其他学校华为俱乐部的技术合作和技术交流；"
            }]
          }]
        }]
      }, {
        id: "hufen",
        name: "花粉部",
        open: !1,
        contents: [{
          name: "p",
          attrs: {
            class: "rich-p"
          },
          children: [{
            type: "text",
            text: "花粉部是隶属于华为创新俱乐部之下的，去商业化的高校社团。是俱乐部中与公司联系最紧密的部门，每年会协助举办许多华为独家赛事和大型品牌活动，服务大批花粉，汇聚无限创意。"
          }]
        }, {
          name: "p",
          attrs: {
            class: "rich-p"
          },
          children: [{
            type: "text",
            text: "主要负责："
          }]
        }, {
          name: "ol",
          children: [{
            name: "li",
            children: [{
              type: "text",
              text: "与公司花粉部门进行对接，协助推广华为品牌；"
            }]
          }, {
            name: "li",
            children: [{
              type: "text",
              text: "组织参与花粉俱乐部同城的相关活动（包括观看发布会和参过实体门店）；"
            }]
          }, {
            name: "li",
            children: [{
              type: "text",
              text: "Web应用开发（前端，后台）；"
            }]
          }, {
            name: "li",
            children: [{
              type: "text",
              text: "负责神机营在西电的运营；"
            }]
          }]
        }]
      }, {
        id: "mishu",
        name: "秘书部",
        open: !1,
        contents: [{
          name: "p",
          attrs: {
            class: "rich-p"
          },
          children: [{
            type: "text",
            text: "秘书处是今年刚刚合并成立的部门，既肩负着策划组织俱乐部活动的工作，也承担着线上线下的宣传工作。来到这里，既可以提高自己的组织策划能力，也可以学习PS、视频剪辑等技能。"
          }]
        }, {
          name: "p",
          attrs: {
            class: "rich-p"
          },
          children: [{
            type: "text",
            text: "主要负责："
          }]
        }, {
          name: "ol",
          children: [{
            name: "li",
            children: [{
              type: "text",
              text: "组织策划俱乐部内、俱乐部间的大型活动；"
            }]
          }, {
            name: "li",
            children: [{
              type: "text",
              text: "俱乐部的日常运营，包括各平台公众号（QQ、微博、bilibili）的日常维护和运营；"
            }]
          }, {
            name: "li",
            children: [{
              type: "text",
              text: "各个活动的宣传稿和新闻稿的内容编辑、以及海报的设计制作；"
            }]
          }]
        }]
      }, {
        id: "HIC Stdio",
        name: "HIC工作室",
        open: !1,
        contents: [{
          name: "p",
          attrs: {
            class: "rich-p"
          },
          children: [{
            type: "text",
            text: "如果你对数码产品有极大的好奇与偏爱，如果你对5G等前沿技术充满好奇，如果你对制作属于自己的视频充满兴趣，那你一定要来HIC工作室看看。"
          }]
        }, {
          name: "p",
          attrs: {
            class: "rich-p"
          },
          children: [{
            type: "text",
            text: "作为一个准备成立的影音工作室，HIC的一切都才刚刚开始，但我们相信从零到一的过程才是最有趣的。HIC工作室并不会直接招收成员，而是在你们成功加入俱乐部后进行内部的挑选，希望到时候可以见到你们。"
          }]
        }]
      }
    ]
  },
  onLoad: function(t) {},
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {
    return {
      title: "西电华为创新俱乐部"
    };
  },
  kindToggle: function(t) {
    for (var e = t.currentTarget.id, n = this.data.list, a = 0, i = n.length; a < i; ++a) n[a].id == e ? n[a].open = !n[a].open : n[a].open = !1;
    this.setData({
      list: n
    });
  }
});