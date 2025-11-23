import { PageContent, PageType } from './types';
import { 
  HeartPulse, Phone, Stethoscope, Video, Calendar, UserCheck, 
  Bed, Truck, Activity, Globe, Plane, FileText, MapPin, Smartphone, Building2
} from 'lucide-react';

// Brand Colors
export const THEME_PURPLE = '#5D4B8E'; 
export const THEME_GOLD = '#C8AA6E';

export const APPLICATION_STEPS = [
  { title: "官方微信/APP", desc: "自助申请", icon: Smartphone },
  { title: "客服热线", desc: "956095", icon: Phone },
  { title: "分支机构", desc: "柜面申请", icon: Building2 }
];

// Images
const IMG_SOFA_FAMILY = "https://images.unsplash.com/photo-1581955943660-763192875217?q=80&w=2670&auto=format&fit=crop"; 
const IMG_READING = "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2640&auto=format&fit=crop"; 
const IMG_CONSULT = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2664&auto=format&fit=crop";

export const BOOK_PAGES: PageContent[] = [
  // --- COVER ---
  {
    type: PageType.COVER,
    layout: 'cover',
    title: "「同守护」\n健康服务手册",
    subtitle: "( B 版 )",
    englishTitle: "HEALTH SERVICE\nHANDBOOK",
    backgroundImage: "https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?q=80&w=2574&auto=format&fit=crop"
  },
  
  // --- INTRO ---
  {
    type: PageType.CONTENT,
    layout: 'intro',
    title: "致辞",
    englishTitle: "AEGON THTF",
    pageNumber: 1,
    image: IMG_SOFA_FAMILY,
    text: [
      "亲爱的客户：您好！感谢您选择同方全球人寿，赋予我们守护您健康的信任。",
      "财富是福，健康是金。我们深知，真正的保障不仅是风险补偿，更是未雨绸缪的陪伴。因此，我们以「同守护」为承诺 ——",
      "同心共守，全程相护：覆盖诊前、诊中、诊后的全周期医疗服务，我们始终在您需要时触手可及。",
      "如您在使用相关服务的过程中有任何特殊需求，或有任何意见和建议，请与您的专属保险顾问联系，我们将以主动、精准的行动，让健康保障真正融入生活。",
      "愿这份承诺，成为您和家人从容面对未来的底气。"
    ],
    subtitle: "同方全球人寿"
  },

  // --- TOC ---
  {
    type: PageType.TOC,
    layout: 'toc',
    title: "目录",
    englishTitle: "CONTENTS",
    pageNumber: 2,
    image: IMG_READING,
    bullets: [
      "01 ... 温馨提示\nFriendly Reminder",
      "02 ... 服务使用条件\nService Usage Conditions",
      "03 ... 服务介绍及流程\nService Introduction and Process"
    ]
  },

  // --- SECTION 1: FRIENDLY REMINDER ---
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "一、温馨提示",
    englishTitle: "FRIENDLY REMINDER",
    pageNumber: 3,
    text: [
      "1. 请您仔细阅读本服务手册，并确定了解服务内容、服务流程、服务免责等信息，且知晓我们对您个人信息的处理规则。完整阅读本服务手册，尤其是其中加粗字体的部分。",
      "2. 本服务手册旨在指导您更好地使用保险产品条款所约定的健康管理服务，如发现本服务手册与保险产品条款不一致，以保险产品的保险条款为准。",
      "3. 本服务手册内健康资讯、电话医生、在线问诊、专家门诊/陪诊、住院/手术安排、国内二次诊疗、专人探视关怀、住院护工照护、上门护理、出院交通安排及陪护、院后居家康复指导书、海外多学科会诊、海外就医安排服务由同方全球人寿委托第三方服务商提供。"
    ]
  },
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "温馨提示 (续)",
    englishTitle: "REMINDER CONT.",
    pageNumber: 4,
    text: [
      "4. 本服务手册内的服务在任何方面都不得被理解为保险理赔结论以及与保险理赔有关的任何承诺。任何保险理赔结果均应以同方全球人寿的审核结论为准。",
      "5. 在使用服务前，被保险人需完成信息授权，以便服务商提供本服务手册约定的健康医疗服务。",
      "6. 由于您提供不真实、不准确、不完整、不及时或不能反映当前情况的相关资料，而导致本服务发生缺失偏差或延误，相应责任将由您自行承担。",
      "7. 对于合理控制范围以外的各种原因，包括但不限于自然灾害、罢工、政府行为、通讯故障等，同方全球人寿及服务商不负责任。"
    ]
  },
  
  // --- SECTION 2: SERVICE CONDITIONS ---
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "二、服务使用条件",
    englishTitle: "SERVICE CONDITIONS",
    pageNumber: 5,
    text: [
        "1. 适用产品：本服务手册所载服务提供给持有“同守护”健康服务适用重疾保险产品的被保险人，服务不可转让他人。",
        "2. 服务期限：需同时满足保单有效期内提供；因保险合同发生理赔或期满导致合同终止，服务期限可延长 30 天。",
        "3. 疾病范围：",
        "(1) 等待期后，健康资讯、电话医生、在线问诊服务可不限疾病使用；",
        "(2) 专家门诊/陪诊、住院/手术安排、国内二次诊疗、专人探视关怀、住院护工照护、上门护理、出院交通安排及陪护、院后居家康复指导书服务限罹患或疑似罹患保险合同约定的疾病使用；",
        "(3) 海外多学科会诊、海外就医安排服务限确诊保险合同约定的疾病使用。"
    ]
  },
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "服务使用条件 (续)",
    englishTitle: "CONDITIONS CONT.",
    pageNumber: 6,
    text: [
        "4. 等待期：服务等待期为对应的保险合同生效后 90 天。",
        "5. 特别说明：",
        "· 由于疫情等其他不可抗力原因导致服务临时取消或延期服务的，会进一步为客户协调其他时间。",
        "· 为客户安排就医服务后，若因本人原因不能按时就医，或由于自身原因耽误就医进程的，则视同该服务已完成。",
        "· 在提供服务时，向客户收集身份信息、病历等医疗资料以便安排后续服务时，客户拒绝提供必要个人材料和医疗资料时，则无法安排后续服务。",
        "· 客户故意隐瞒病史、既往症及不符合服务启动条件申请服务时，服务方有权拒绝提供服务。"
    ]
  },

  // --- SECTION 3: SERVICES ---
  // Health Info
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "（一）健康资讯",
    englishTitle: "HEALTH INFO",
    pageNumber: 7,
    text: ["为客户定期提供包括医疗卫生行业资讯、最新医疗科研动态、健康/养生知识、健康热点新闻、健康生活等相关知识的推广和普及。"],
    bullets: [
        "服务次数：不限次数",
        "服务范围：无地域范围限制"
    ],
    hasServiceApplication: true,
    serviceSteps: [
        { title: "登录查看", desc: "微信/APP", icon: Smartphone }
    ]
  },
  
  // Phone Doctor
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "（二）电话医生",
    englishTitle: "PHONE DOCTOR",
    pageNumber: 8,
    text: [
        "电话医生由咨询医生（主治及医生级别执业医师）为客户提供 7*24 小时的个性化健康咨询和常见疾病咨询。",
        "服务内容包括就医信息咨询、日常健康咨询（体检报告解读、用药指导、分诊、作息饮食建议等）。"
    ],
    bullets: [
        "服务次数：不限次数",
        "注意事项：意见仅供参考，急重症请就医；精神类疾病/心理咨询不在范围内。",
        "平均接通时长约9秒，高峰期可能延时。"
    ],
    hasServiceApplication: true
  },

  // Online Inquiry
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "（三）在线问诊",
    englishTitle: "ONLINE INQUIRY",
    pageNumber: 9,
    text: ["专业医生团队 7*24 小时全天候响应，为客户提供在线咨询、常见病、多发病诊断、体检报告解读等服务。"],
    bullets: [
        "服务次数：不限次数",
        "责任免除：线上问诊无法达到100%检出率，意见仅供参考，不替代线下就医。",
        "急重症请及时前往医院就诊。"
    ],
    hasServiceApplication: true
  },

  // Specialist
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "（四）专家门诊/陪诊",
    englishTitle: "SPECIALIST",
    pageNumber: 10,
    image: IMG_CONSULT,
    text: ["为客户协助预约三甲医院副主任及以上级别的专家门诊，并安排医学专业人员陪伴客户就诊。"],
    bullets: [
        "次数限制：在服务有效期内限 3 次/年",
        "疾病要求：限罹患或疑似罹患合同约定疾病",
        "材料要求：须出具二级及以上医院相关检查诊断证明"
    ],
    hasServiceApplication: true
  },
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "专家门诊 - 注意事项",
    englishTitle: "IMPORTANT NOTES",
    pageNumber: 11,
    bullets: [
        "此服务仅协助预约指定的医院及科室，不可指定医生。",
        "取消需提前一个工作日（中午 12 点前），否则计次。",
        "实行实名制，需提供真实身份及病情资料。",
        "建议至少提前 2 个工作日提交申请。",
        "暂不支持产检、体检、急诊、当日门诊预约。",
        "挂号费、诊疗费等费用由就诊人自行支付。",
        "因医疗资源特殊性，无法保证 100% 协助预约成功。"
    ]
  },

  // Hospitalization
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "（五）住院/手术安排",
    englishTitle: "HOSPITALIZATION",
    pageNumber: 12,
    text: ["住院/手术安排为已开具住院单、住院登记材料的客户协调加快其材料对应的医院及科室的入院流程。"],
    bullets: [
        "次数限制：有效期内限 1 次/年，保单有效期内限 2 次",
        "疾病要求：限罹患或疑似罹患合同约定疾病",
        "范围：以官网医院清单为准"
    ],
    hasServiceApplication: true
  },
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "住院安排 - 注意事项",
    englishTitle: "IMPORTANT NOTES",
    pageNumber: 13,
    bullets: [
        "移植手术需等待医院配型，不在协调范围内。",
        "确定启动后坚持取消，视同已使用服务。",
        "不承诺指定医生。",
        "需配合提供真实有效证件及病情资料。",
        "医疗费用自理。",
        "因资源特殊性，无法保证 100% 预约成功。"
    ]
  },

  // Second Opinion
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "（六）国内二次诊疗",
    englishTitle: "SECOND OPINION",
    pageNumber: 14,
    text: ["为已经获得第一病理意见（诊断）的客户，提供国内权威三甲医院病理专科的预约和全程就医陪同服务。"],
    bullets: [
        "次数限制：有效期内限 1 次/年",
        "材料要求：须出具二级及以上医院病理报告",
        "范围：以官网医院清单为准"
    ],
    boxTitle: "特别说明",
    boxText: ["注意事项同专家门诊服务。需提供真实就诊人有效个人证件及有效病情资料。"],
    hasServiceApplication: true
  },

  // Visit & Nursing
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "（七）专人探视关怀",
    englishTitle: "HOSPITAL VISIT",
    pageNumber: 15,
    text: ["为客户进行院内探访和慰问，提供暖心关怀。"],
    bullets: [
        "次数限制：有效期内限 1 次/年",
        "条件：因罹患或疑似罹患合同约定疾病入院",
        "范围：同方全球人寿有机构设置城市的三甲医院",
        "注：须提前 48 小时申请；特定情况（如整形、体检等）不在服务范围内。"
    ],
    hasServiceApplication: true
  },
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "（八）住院护工照护",
    englishTitle: "NURSING CARE",
    pageNumber: 16,
    text: ["由专业医院护理人员提供不超过 10 天的 24 小时院内护理服务，包括基本生活照料、清洁与卫生、情况观察、关怀陪同等。"],
    bullets: [
        "次数限制：有效期内限 1 次/年",
        "范围：同方全球人寿有机构设置城市的三甲医院",
        "单次上限 10 天，不可拆分使用，不满 10 天视同一次。",
        "注：需提前 48 小时申请；传染性疾病/精神类疾病不可提供服务。"
    ],
    hasServiceApplication: true
  },

  // Home Nursing
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "（九）上门护理",
    englishTitle: "HOME NURSING",
    pageNumber: 17,
    text: ["由通过执业资格认证的医生/护士，根据客户提供的医嘱及疾病情况进行评估，提供上门打针、静脉采血、外科伤口拆线、换药等服务（不开具处方/药品）。"],
    hasServiceApplication: true,
    bullets: [
        "次数限制：有效期内限 1 次/年",
        "范围：同方全球人寿有机构设置城市的主要城市区域",
        "单次服务以 7 天为上限，不可拆分。"
    ]
  },
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "上门护理 - 详细项目",
    englishTitle: "SERVICE ITEMS",
    pageNumber: 18,
    table: {
        headers: ["序号", "服务项目", "序号", "服务项目"],
        colWidths: ["10%", "40%", "10%", "40%"],
        rows: [
            ["1", "上门打针", "15", "膀胱冲洗"],
            ["2", "静脉采血", "16", "压力性损伤换药"],
            ["3", "PICC维护", "17", "口腔护理"],
            ["4", "伤口拆线", "18", "雾化护理"],
            ["5", "伤口换药", "19", "安全护理"],
            ["6", "留置导尿", "20", "直肠栓剂给药"],
            ["7", "留置胃管", "21", "肠造口护理"],
            ["8", "输液港维护", "22", "吸痰护理"],
            ["9", "引流管护理", "23", "灌肠护理"],
            ["10", "鼻饲护理", "24", "腹透管维护"],
            ["11", "肺炎预防", "25", "腹膜透析"],
            ["12", "氧气吸入", "26", "心脑血管护理"],
            ["13", "糖尿病足护理", "27", "癌痛控制"],
            ["14", "气切置管护理", "", ""]
        ]
    }
  },

  // Transport & Rehab
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "（十）出院交通安排及陪护",
    englishTitle: "TRANSPORTATION",
    pageNumber: 19,
    text: ["由专业护士及专业车辆出院当天提前到达医院，全程办理出院手续。"],
    bullets: [
        "同城：专车接送回家",
        "异地：承担患者及 1 位陪同家属交通费用（飞机经济舱或高铁二等座）",
        "特殊需求：行动受限客户提供专业救护车或平躺车辆",
        "次数限制：有效期内限 1 次/年",
        "范围：同方全球人寿有机构设置城市的三甲医院"
    ],
    hasServiceApplication: true
  },
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "（十一）院后居家康复指导书",
    englishTitle: "REHABILITATION",
    pageNumber: 20,
    text: ["由专业医生、护士、康复师、影像学医师根据患者出院小结及当时具体情况，为客户定制院后居家康复指导书。"],
    bullets: [
        "生活照料指导 / 基础并发症照料指导",
        "康复促进指导 / 医疗护理指导",
        "次数限制：有效期内限 1 次/年",
        "需提前 48 小时申请"
    ],
    hasServiceApplication: true
  },

  // Overseas Consult
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "（十二）海外多学科会诊",
    englishTitle: "OVERSEAS CONSULT",
    pageNumber: 21,
    text: ["协助安排海外多学科会诊，让客户足不出户，近距离接触世界一流权威的海外专家，享受海外顶级医疗治疗方案。"],
    bullets: [
        "病例翻译：搜集整理，3个工作日完成",
        "专家推荐：匹配海外专家，1-2周落实安排",
        "会诊形式：视频、音频或书面",
        "报告书：出具《海外诊疗意见报告书》及中文翻译"
    ]
  },
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "海外会诊 - 申请与说明",
    englishTitle: "APPLICATION",
    pageNumber: 22,
    hasServiceApplication: true,
    text: ["本服务提供给“同守护”健康服务适用重疾保险产品同一产品累计保额≥50万的被保险人。"],
    bullets: [
        "确诊保险合同约定疾病，限 1 次/年",
        "会诊标准时间 45-60 分钟",
        "不承诺指定医生",
        "客户需提供完整病例资料，中途取消视同已使用",
        "服务商提供建议，客户自行决定是否采纳"
    ]
  },

  // Overseas Treatment
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "（十三）海外就医安排",
    englishTitle: "OVERSEAS TREATMENT",
    pageNumber: 23,
    text: ["根据客户病情和需求，安排海外权威医院就医服务，尊享美国、日本、新加坡、中国台湾顶级医疗资源。"],
    bullets: [
        "1. 海外就诊咨询：推荐医院/诊所，指导手续",
        "2. 病历整理翻译：中英互译，整理病情",
        "3. 协助预约：预约权威医院，获取邀请函",
        "4. 费用预估：协助沟通评估治疗费用",
        "5. 协助住院：办理住院手续指导",
        "6. 首诊陪同：专业翻译陪同",
        "7. 医疗送返：制定送返方案（费用客户承担）"
    ]
  },
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "海外就医 - 辅助服务",
    englishTitle: "ASSISTANCE",
    pageNumber: 24,
    bullets: [
        "8. 康复跟踪：回国后 1 个月内指导建议",
        "9. 签证延期协助：治疗导致签证到期时协助",
        "10. 交通/住宿协助：安排当地食宿交通（费用自理）",
        "11. 机场接送：安排一次接送机并承担费用"
    ],
    boxTitle: "适用说明",
    boxText: ["适用对象：同守护重疾保额≥50万客户。限确诊约定疾病，1次/年。"],
    hasServiceApplication: true
  },
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "海外就医 - 注意事项",
    englishTitle: "IMPORTANT NOTES",
    pageNumber: 25,
    bullets: [
        "服务区域：美国、日本、新加坡、中国台湾。",
        "不承诺指定医生。",
        "未及时办理手续或签证导致耽误，视同服务完成。",
        "第三方费用（差旅、食宿、医疗费等）由客户自理。",
        "亲属陪同费用自理。",
        "同方全球人寿及服务商不保证治疗效果。"
    ]
  },

  // --- TABLES ---
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "附件：海外就医医院清单 (1/5)",
    englishTitle: "HOSPITAL LIST",
    pageNumber: 26,
    table: {
        headers: ["国家", "医院名称"],
        colWidths: ["25%", "75%"],
        rows: [
            ["美国", "Brigham and Women's Hospital 布列根和妇女医院"],
            ["美国", "UCSF Medical Center 加州大学旧金山分校"],
            ["美国", "Ohio State University Medical Center 俄亥俄州立"],
            ["美国", "Mount Sinai Hospital New York 纽约西奈山医院"],
            ["美国", "University of Miami Hospital 迈阿密大学医院"],
            ["美国", "University of Michigan Hospital 密歇根大学医院"],
            ["美国", "Massachusetts General Hospital 麻省总医院"],
            ["美国", "Cedars-Sinai Medical Center 西达赛奈研究所"],
            ["美国", "UCLA Medical Center 加州大学洛杉矶分校"],
            ["美国", "Mayo Clinic 梅奥诊所"]
        ]
    }
  },
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "附件：海外就医医院清单 (2/5)",
    englishTitle: "HOSPITAL LIST",
    pageNumber: 27,
    table: {
        headers: ["国家", "医院名称"],
        colWidths: ["25%", "75%"],
        rows: [
            ["日本", "顺天堂大学顺天堂医院 (综合)"],
            ["日本", "东京女子医科大学附属医院 (综合)"],
            ["日本", "庆应义塾大学附属医院 (综合)"],
            ["日本", "国立癌症中心-中央医院 (癌症)"],
            ["日本", "癌研有明医院 (癌症/肠/胃/乳腺)"],
            ["日本", "虎门医院 (肠/胃/肝胆)"],
            ["日本", "圣路加国际医院 (乳腺)"],
            ["日本", "日本医科大学附属医院 (脑中风)"],
            ["日本", "昭和大学医院 (造血干细胞)"],
            ["日本", "东京共济医院 (肾病)"]
        ]
    }
  },
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "附件：海外就医医院清单 (3/5)",
    englishTitle: "HOSPITAL LIST",
    pageNumber: 28,
    table: {
        headers: ["国家/科室", "医院名称"],
        colWidths: ["30%", "70%"],
        rows: [
            ["日本/脑部", "东京女子医科大学医院"],
            ["日本/癫痫", "国立精神·神经医疗研究中心医院"],
            ["日本/眼科", "东京医科大学医院"],
            ["日本/骨科", "庆应义塾大学附属医院"],
            ["日本/心脏", "千叶西综合医院"],
            ["新加坡", "伊丽莎白(乌节)医院"],
            ["新加坡", "鹰阁医院"],
            ["新加坡", "斐瑞医院"],
            ["中国台湾", "三军总医院"],
            ["中国台湾", "北市联医中兴/仁爱/和平妇幼院区"]
        ]
    }
  },
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "附件：海外就医医院清单 (4/5)",
    englishTitle: "HOSPITAL LIST",
    pageNumber: 29,
    table: {
        headers: ["地区", "医院名称"],
        colWidths: ["30%", "70%"],
        rows: [
            ["台北", "台大医院"],
            ["台北", "台北荣民总医院"],
            ["台北", "长庚纪念医院 (基隆/林口/桃园)"],
            ["台北", "马偕纪念医院"],
            ["台北", "国泰综合医院"],
            ["台中", "台中荣民总医院"],
            ["台中", "中山医学大学附设医院"],
            ["台中", "中国医药大学附设医院"],
            ["台南", "成大医院"],
            ["台南", "奇美医院"]
        ]
    }
  },
  {
    type: PageType.CONTENT,
    layout: 'standard',
    title: "附件：海外就医医院清单 (5/5)",
    englishTitle: "HOSPITAL LIST",
    pageNumber: 30,
    table: {
        headers: ["地区", "医院名称"],
        colWidths: ["30%", "70%"],
        rows: [
            ["高雄", "高雄长庚纪念医院"],
            ["高雄", "高雄荣民总医院"],
            ["高雄", "高雄医学大学附设医院"],
            ["高雄", "义大医院"],
            ["其他", "彰化基督教医院"],
            ["其他", "花莲慈济医院"]
        ]
    },
    text: ["* 以上清单仅供参考，具体以服务启动时服务商提供的最新清单为准。"]
  },

  // --- BACK COVER ---
  {
    type: PageType.BACK_COVER,
    layout: 'back_cover',
    title: "同方全球人寿",
    englishTitle: "AEGON THTF",
    subtitle: "服务热线: 956095",
    text: ["官网: www.aegonthtf.com", "地址：深圳市福田区中心四路1-1号嘉里建设广场T3座4001-4002"],
    backgroundImage: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=2670&auto=format&fit=crop"
  }
];