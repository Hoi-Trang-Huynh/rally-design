import svgPaths from "./svg-8fhs0h4g3b";

function Notch() {
  return (
    <div className="-translate-x-1/2 absolute h-[32px] left-1/2 top-0 w-[172px]" data-name="Notch">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 172 32">
        <g id="Notch">
          <path d={svgPaths.p29d69840} fill="var(--fill-0, black)" id="notch" />
        </g>
      </svg>
    </div>
  );
}

function StatusBarTime() {
  return (
    <div className="-translate-x-1/2 absolute h-[21px] left-[calc(16.67%-11px)] rounded-[24px] top-[14px] w-[54px]" data-name="_StatusBar-time">
      <p className="-translate-x-1/2 absolute font-['SF_Pro_Text:Semibold',sans-serif] h-[20px] leading-[21px] left-[27px] not-italic text-[16px] text-black text-center top-px tracking-[-0.32px] w-[54px] whitespace-pre-wrap">9:41</p>
    </div>
  );
}

function LeftSide() {
  return (
    <div className="-translate-x-1/2 absolute contents left-[calc(16.67%-11px)] top-[14px]" data-name="Left Side">
      <StatusBarTime />
    </div>
  );
}

function RightSide() {
  return (
    <div className="-translate-x-1/2 absolute h-[13px] left-[calc(83.33%-0.3px)] top-[19px] w-[77.401px]" data-name="Right Side">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.4012 13">
        <g id="Right Side">
          <g id="_StatusBar-battery">
            <path d={svgPaths.p26f34780} id="Outline" opacity="0.35" stroke="var(--stroke-0, black)" />
            <path d={svgPaths.p4c0c710} fill="var(--fill-0, black)" id="Battery End" opacity="0.4" />
            <path d={svgPaths.p22239c00} fill="var(--fill-0, black)" id="Fill" />
          </g>
          <path d={svgPaths.p17d55700} fill="var(--fill-0, black)" id="Wifi" />
          <g id="Icon / Mobile Signal">
            <path d={svgPaths.p16816b00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p18ef7a00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2262f080} fill="var(--fill-0, black)" />
            <path d={svgPaths.pc5da680} fill="var(--fill-0, black)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="h-[47px] overflow-clip relative shrink-0 w-[390px]" data-name="StatusBar">
      <Notch />
      <LeftSide />
      <RightSide />
    </div>
  );
}

function IconM3ArrowBack() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="icon_m3/arrow_back">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="icon_m3/arrow_back">
          <path d={svgPaths.p1ad02700} fill="var(--fill-0, #292827)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex h-[28px] items-start relative shrink-0 w-full" data-name="Title">
      <p className="font-['Inclusive_Sans:Medium',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#292827] text-[20px]">Tour: Thai Lan</p>
    </div>
  );
}

function SubTitle() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Sub-title">
      <p className="font-['Inclusive_Sans:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#949493] text-[14px]">14 Jun - 26 Jun 2026</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Container">
      <Title />
      <SubTitle />
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#d4d4d4] relative rounded-[28px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative w-full">
          <p className="font-['Inclusive_Sans:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#3e3e3d] text-[14px]" style={{ fontFeatureSettings: "'ss01'" }}>
            Draft
          </p>
        </div>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0" data-name="Label">
      <Container1 />
    </div>
  );
}

function IconM3MoreVert() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon_m3/more_vert">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon_m3/more_vert">
          <path d={svgPaths.p34810300} fill="var(--fill-0, #292827)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex gap-[12px] items-center pb-[12px] pt-[16px] relative shrink-0 w-full" data-name="Header">
      <IconM3ArrowBack />
      <Container />
      <Label />
      <IconM3MoreVert />
    </div>
  );
}

function HeaderPage() {
  return (
    <div className="content-stretch flex flex-col items-start px-[16px] relative shrink-0 w-[390px]" data-name="Header-page">
      <Header />
    </div>
  );
}

function TabsWScroll() {
  return <div className="h-[44px] shrink-0 w-full" data-name="Tabs w scroll" />;
}

function Tabs() {
  return (
    <div className="relative shrink-0 w-full" data-name="Tabs">
      <div aria-hidden="true" className="absolute border-[#eaeae9] border-b-[0.6px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pl-[10px] relative w-full">
        <TabsWScroll />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-center relative shrink-0" data-name="Container">
      <p className="font-['Inclusive_Sans:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#545352] text-[16px]" style={{ fontFeatureSettings: "'ss01'" }}>
        Fri
      </p>
      <p className="font-['Inclusive_Sans:SemiBold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#545352] text-[14px]" style={{ fontFeatureSettings: "'ss01'" }}>
        14
      </p>
      <div className="relative shrink-0 size-[4px]" data-name="Ellipse/active">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #545352)" id="Ellipse/active" r="2" />
        </svg>
      </div>
    </div>
  );
}

function TabTextItem() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0 w-[30px]" data-name="Tab/Text_Item_1">
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col font-['Inclusive_Sans:Regular',sans-serif] gap-[2px] items-center leading-[24px] not-italic relative shrink-0 text-[#949493]" data-name="Container">
      <p className="relative shrink-0 text-[16px]" style={{ fontFeatureSettings: "'ss01'" }}>
        Sat
      </p>
      <p className="relative shrink-0 text-[14px]" style={{ fontFeatureSettings: "'ss01'" }}>
        15
      </p>
    </div>
  );
}

function TabTextItem1() {
  return (
    <div className="content-stretch flex flex-col items-center relative rounded-[8px] shrink-0 w-[30px]" data-name="Tab/Text_Item_2">
      <Container4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col font-['Inclusive_Sans:Regular',sans-serif] gap-[2px] items-center leading-[24px] not-italic relative shrink-0 text-[#949493]" data-name="Container">
      <p className="relative shrink-0 text-[16px]" style={{ fontFeatureSettings: "'ss01'" }}>
        Sun
      </p>
      <p className="relative shrink-0 text-[14px]" style={{ fontFeatureSettings: "'ss01'" }}>
        16
      </p>
    </div>
  );
}

function TabTextItem2() {
  return (
    <div className="content-stretch flex flex-col items-center relative rounded-[8px] shrink-0 w-[30px]" data-name="Tab/Text_Item_3">
      <Container5 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col font-['Inclusive_Sans:Regular',sans-serif] gap-[2px] items-center leading-[24px] not-italic relative shrink-0 text-[#949493]" data-name="Container">
      <p className="relative shrink-0 text-[16px]" style={{ fontFeatureSettings: "'ss01'" }}>
        Mon
      </p>
      <p className="relative shrink-0 text-[14px]" style={{ fontFeatureSettings: "'ss01'" }}>
        17
      </p>
    </div>
  );
}

function TabTextItem3() {
  return (
    <div className="content-stretch flex flex-col items-center relative rounded-[8px] shrink-0 w-[30px]" data-name="Tab/Text_Item_4">
      <Container6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col font-['Inclusive_Sans:Regular',sans-serif] gap-[2px] items-center leading-[24px] not-italic relative shrink-0 text-[#949493]" data-name="Container">
      <p className="relative shrink-0 text-[16px]" style={{ fontFeatureSettings: "'ss01'" }}>
        Tue
      </p>
      <p className="relative shrink-0 text-[14px]" style={{ fontFeatureSettings: "'ss01'" }}>
        18
      </p>
    </div>
  );
}

function TabTextItem4() {
  return (
    <div className="content-stretch flex flex-col items-center relative rounded-[8px] shrink-0 w-[30px]" data-name="Tab/Text_Item_5">
      <Container7 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col font-['Inclusive_Sans:Regular',sans-serif] gap-[2px] items-center leading-[24px] not-italic relative shrink-0 text-[#949493]" data-name="Container">
      <p className="relative shrink-0 text-[16px]" style={{ fontFeatureSettings: "'ss01'" }}>
        Wed
      </p>
      <p className="relative shrink-0 text-[14px]" style={{ fontFeatureSettings: "'ss01'" }}>
        19
      </p>
    </div>
  );
}

function TabTextItem5() {
  return (
    <div className="content-stretch flex flex-col items-center relative rounded-[8px] shrink-0 w-[30px]" data-name="Tab/Text_Item_6">
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col font-['Inclusive_Sans:Regular',sans-serif] gap-[2px] items-center leading-[24px] not-italic relative shrink-0 text-[#949493]" data-name="Container">
      <p className="relative shrink-0 text-[16px]" style={{ fontFeatureSettings: "'ss01'" }}>
        Thur
      </p>
      <p className="relative shrink-0 text-[14px]" style={{ fontFeatureSettings: "'ss01'" }}>
        20
      </p>
    </div>
  );
}

function TabTextItem6() {
  return (
    <div className="content-stretch flex flex-col items-center relative rounded-[8px] shrink-0 w-[30px]" data-name="Tab/Text_Item_7">
      <Container9 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col font-['Inclusive_Sans:Regular',sans-serif] gap-[2px] items-center leading-[24px] not-italic relative shrink-0 text-[#949493]" data-name="Container">
      <p className="relative shrink-0 text-[16px]" style={{ fontFeatureSettings: "'ss01'" }}>
        Fri
      </p>
      <p className="relative shrink-0 text-[14px]" style={{ fontFeatureSettings: "'ss01'" }}>
        21
      </p>
    </div>
  );
}

function TabTextItem7() {
  return (
    <div className="content-stretch flex flex-col items-center relative rounded-[8px] shrink-0 w-[30px]" data-name="Tab/Text_Item_8">
      <Container10 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[24px] items-start min-h-px min-w-px relative" data-name="Container">
      <TabTextItem />
      <TabTextItem1 />
      <TabTextItem2 />
      <TabTextItem3 />
      <TabTextItem4 />
      <TabTextItem5 />
      <TabTextItem6 />
      <TabTextItem7 />
    </div>
  );
}

function TabText() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px overflow-clip relative" data-name="Tab/Text">
      <Container2 />
    </div>
  );
}

function IndicatorsWPadding() {
  return (
    <div className="relative shrink-0 w-full" data-name="Indicators w padding">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[20px] relative w-full">
          <TabText />
        </div>
      </div>
    </div>
  );
}

function Title1() {
  return (
    <div className="shrink-0 sticky top-0 w-full" data-name="Title">
      <div className="capitalize content-stretch flex font-['Inclusive_Sans:Medium',sans-serif] gap-[4px] items-start leading-[24px] not-italic px-[20px] relative text-[16px] w-full">
        <p className="relative shrink-0 text-[#7f7e7d]">Day 1 :</p>
        <p className="flex-[1_0_0] min-h-px min-w-px relative text-[#292827] whitespace-pre-wrap">Vietnam → Bangkok</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="capitalize font-['Inclusive_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#a9a9a9] text-[16px]">Night</p>
    </div>
  );
}

function IconM3Bedtime() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon_m3/bedtime">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon_m3/bedtime">
          <path d={svgPaths.p22e9be80} fill="var(--fill-0, #A9A9A9)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TimePeriodNight() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Time-period/night">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[4px] pl-[10px] pt-[8px] relative w-full">
          <Frame />
          <IconM3Bedtime />
        </div>
      </div>
    </div>
  );
}

function IconM3DirectionsWalk() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon_m3/directions_walk">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon_m3/directions_walk">
          <path d={svgPaths.p381d1400} fill="var(--fill-0, #BFBFBE)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#f5f5f5] h-[40px] relative rounded-[28px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[10px] py-[8px] relative size-full">
          <IconM3DirectionsWalk />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0" data-name="Button">
      <Container11 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex items-start max-h-[24px] relative shrink-0 w-full" data-name="Heading">
      <p className="flex-[1_0_0] font-['Inclusive_Sans:Medium',sans-serif] leading-[24px] min-h-px min-w-px not-italic overflow-hidden relative text-[#a9a9a9] text-[16px] text-ellipsis whitespace-nowrap">{`Airport check-in & departure`}</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <path d={svgPaths.pc6c7080} fill="var(--fill-0, #A9A9A9)" id="icon_2" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-['Inclusive_Sans:Medium',sans-serif] gap-[2px] items-center justify-center not-italic relative text-[#a9a9a9] text-center">
        <p className="leading-[20px] relative shrink-0 text-[14px]" style={{ fontFeatureSettings: "'ss01'" }}>
          3:00 AM
        </p>
        <div className="flex flex-col h-[8px] justify-center leading-[0] relative shrink-0 text-[16px] w-[9px]" style={{ fontFeatureSettings: "'ss01'" }}>
          <p className="leading-[24px] whitespace-pre-wrap">-</p>
        </div>
        <p className="leading-[20px] relative shrink-0 text-[14px]" style={{ fontFeatureSettings: "'ss01'" }}>
          6:00 AM
        </p>
      </div>
    </div>
  );
}

function RoleTime() {
  return (
    <div className="bg-[#eaeae9] content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[6px] relative rounded-[8px] shrink-0" data-name="Role-Time">
      <Icon />
      <Text />
    </div>
  );
}

function SubHeading() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Sub-heading">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative w-full">
        <p className="flex-[1_0_0] font-['Inclusive_Sans:Regular',sans-serif] leading-[18px] max-w-[298px] min-h-px min-w-px not-italic overflow-hidden relative text-[#bfbfbe] text-[14px] text-ellipsis whitespace-pre-wrap">Lorem ipsum dolor sit amet conse.</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <SubHeading />
    </div>
  );
}

function ContainerCard() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col gap-[4px] items-start px-[12px] py-[10px] relative rounded-[8px] shrink-0 w-[308px]" data-name="Container_card">
      <Heading />
      <RoleTime />
      <Container12 />
    </div>
  );
}

function Card() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Card">
      <Button />
      <ContainerCard />
    </div>
  );
}

function GroupItemsNight() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start pb-[12px] relative shrink-0 w-full" data-name="Group-Items/Night">
      <TimePeriodNight />
      <Card />
    </div>
  );
}

function IconM3WbSunny() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon_m3/wb_sunny">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon_m3/wb_sunny">
          <path d={svgPaths.pe30b00} fill="var(--fill-0, #A9A9A9)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TimePeriodMorning() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Time-period/morning">
      <div className="content-stretch flex items-start justify-between pb-[4px] pl-[10px] pt-[8px] relative w-full">
        <p className="capitalize font-['Inclusive_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#a9a9a9] text-[16px]">Morning</p>
        <IconM3WbSunny />
      </div>
    </div>
  );
}

function IconM3DirectionsWalk1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon_m3/directions_walk">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon_m3/directions_walk">
          <path d={svgPaths.p381d1400} fill="var(--fill-0, #FFEEE8)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#ff6733] h-[40px] relative rounded-[28px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[10px] py-[8px] relative size-full">
          <IconM3DirectionsWalk1 />
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0" data-name="Button">
      <Container13 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex items-start max-h-[24px] relative shrink-0 w-full" data-name="Heading">
      <p className="flex-[1_0_0] font-['Inclusive_Sans:Medium',sans-serif] leading-[24px] min-h-px min-w-px not-italic overflow-hidden relative text-[#3e3e3d] text-[16px] text-ellipsis whitespace-nowrap">International flight</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <path d={svgPaths.pc6c7080} fill="var(--fill-0, #852D0F)" id="icon_2" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-['Inclusive_Sans:Medium',sans-serif] gap-[2px] items-center justify-center not-italic relative text-[#5c1f0a] text-center">
        <p className="leading-[20px] relative shrink-0 text-[14px]" style={{ fontFeatureSettings: "'ss01'" }}>
          6:00 AM
        </p>
        <div className="flex flex-col h-[8px] justify-center leading-[0] relative shrink-0 text-[16px] w-[9px]" style={{ fontFeatureSettings: "'ss01'" }}>
          <p className="leading-[24px] whitespace-pre-wrap">-</p>
        </div>
        <p className="leading-[20px] relative shrink-0 text-[14px]" style={{ fontFeatureSettings: "'ss01'" }}>
          9:00 AM
        </p>
      </div>
    </div>
  );
}

function RoleTime1() {
  return (
    <div className="bg-[#fcb] content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[6px] relative rounded-[8px] shrink-0" data-name="Role-Time">
      <Icon1 />
      <Text1 />
    </div>
  );
}

function SubHeading1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Sub-heading">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative w-full">
        <p className="flex-[1_0_0] font-['Inclusive_Sans:Regular',sans-serif] leading-[18px] max-w-[298px] min-h-px min-w-px not-italic overflow-hidden relative text-[#696968] text-[14px] text-ellipsis whitespace-pre-wrap">Lorem ipsum dolor sit amet conse.</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <SubHeading1 />
    </div>
  );
}

function ContainerCard1() {
  return (
    <div className="bg-[#ffeee8] flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]" data-name="Container_card">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[12px] py-[10px] relative w-full">
        <Heading1 />
        <RoleTime1 />
        <Container14 />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Card">
      <Button1 />
      <ContainerCard1 />
    </div>
  );
}

function IconM3DirectionsWalk2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon_m3/directions_walk">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon_m3/directions_walk">
          <path d={svgPaths.p381d1400} fill="var(--fill-0, #696968)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#f5f5f5] h-[40px] relative rounded-[28px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[10px] py-[8px] relative size-full">
          <IconM3DirectionsWalk2 />
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0" data-name="Button">
      <Container15 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex items-start max-h-[24px] relative shrink-0 w-full" data-name="Heading">
      <p className="flex-[1_0_0] font-['Inclusive_Sans:Medium',sans-serif] leading-[24px] min-h-px min-w-px not-italic overflow-hidden relative text-[#3e3e3d] text-[16px] text-ellipsis whitespace-nowrap">{`Arrival & hotel check-in`}</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <path d={svgPaths.pc6c7080} fill="var(--fill-0, #545352)" id="icon_2" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-['Inclusive_Sans:Medium',sans-serif] gap-[2px] items-center justify-center not-italic relative text-[#545352] text-center">
        <p className="leading-[20px] relative shrink-0 text-[14px]" style={{ fontFeatureSettings: "'ss01'" }}>
          10:00 AM
        </p>
        <div className="flex flex-col h-[8px] justify-center leading-[0] relative shrink-0 text-[16px] w-[9px]" style={{ fontFeatureSettings: "'ss01'" }}>
          <p className="leading-[24px] whitespace-pre-wrap">-</p>
        </div>
        <p className="leading-[20px] relative shrink-0 text-[14px]" style={{ fontFeatureSettings: "'ss01'" }}>
          12:00 PM
        </p>
      </div>
    </div>
  );
}

function RoleTime2() {
  return (
    <div className="bg-[#eaeae9] content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[6px] relative rounded-[8px] shrink-0" data-name="Role-Time">
      <Icon2 />
      <Text2 />
    </div>
  );
}

function SubHeading2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Sub-heading">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative w-full">
        <p className="flex-[1_0_0] font-['Inclusive_Sans:Regular',sans-serif] leading-[18px] max-w-[298px] min-h-px min-w-px not-italic overflow-hidden relative text-[#949493] text-[14px] text-ellipsis whitespace-pre-wrap">Lorem ipsum dolor sit amet con.</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <SubHeading2 />
    </div>
  );
}

function ContainerCard2() {
  return (
    <div className="bg-[#f5f5f5] flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]" data-name="Container_card">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[12px] py-[10px] relative w-full">
        <Heading2 />
        <RoleTime2 />
        <Container16 />
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Card">
      <Button2 />
      <ContainerCard2 />
    </div>
  );
}

function GroupItemsMorning() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start pb-[12px] relative shrink-0 w-full" data-name="Group-Items/Morning">
      <TimePeriodMorning />
      <Card1 />
      <Card2 />
    </div>
  );
}

function IconM3Bedtime1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon_m3/bedtime">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon_m3/bedtime">
          <path d={svgPaths.p1b3892f0} fill="var(--fill-0, #A9A9A9)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function TimePeriodEvening() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Time-period/evening">
      <div className="content-stretch flex items-start justify-between pb-[4px] pl-[10px] pt-[8px] relative w-full">
        <p className="capitalize font-['Inclusive_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#a9a9a9] text-[16px]">Everning</p>
        <IconM3Bedtime1 />
      </div>
    </div>
  );
}

function IconM3DirectionsWalk3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon_m3/directions_walk">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon_m3/directions_walk">
          <path d={svgPaths.p381d1400} fill="var(--fill-0, #696968)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[#f5f5f5] h-[40px] relative rounded-[28px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[10px] py-[8px] relative size-full">
          <IconM3DirectionsWalk3 />
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative rounded-[8px] shrink-0" data-name="Button">
      <Container17 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex items-start max-h-[24px] relative shrink-0 w-full" data-name="Heading">
      <p className="flex-[1_0_0] font-['Inclusive_Sans:Medium',sans-serif] leading-[24px] min-h-px min-w-px not-italic overflow-hidden relative text-[#3e3e3d] text-[16px] text-ellipsis whitespace-nowrap">{`Rest & short walk`}</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <path d={svgPaths.pc6c7080} fill="var(--fill-0, #545352)" id="icon_2" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-['Inclusive_Sans:Medium',sans-serif] gap-[2px] items-center justify-center not-italic relative text-[#545352] text-center">
        <p className="leading-[20px] relative shrink-0 text-[14px]" style={{ fontFeatureSettings: "'ss01'" }}>
          18:00 PM
        </p>
        <div className="flex flex-col h-[8px] justify-center leading-[0] relative shrink-0 text-[16px] w-[9px]" style={{ fontFeatureSettings: "'ss01'" }}>
          <p className="leading-[24px] whitespace-pre-wrap">-</p>
        </div>
        <p className="leading-[20px] relative shrink-0 text-[14px]" style={{ fontFeatureSettings: "'ss01'" }}>
          20:00 PM
        </p>
      </div>
    </div>
  );
}

function RoleTime3() {
  return (
    <div className="bg-[#eaeae9] content-stretch flex gap-[6px] items-center justify-center px-[8px] py-[6px] relative rounded-[8px] shrink-0" data-name="Role-Time">
      <Icon3 />
      <Text3 />
    </div>
  );
}

function SubHeading3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Sub-heading">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative w-full">
        <p className="flex-[1_0_0] font-['Inclusive_Sans:Regular',sans-serif] leading-[18px] max-w-[298px] min-h-px min-w-px not-italic overflow-hidden relative text-[#949493] text-[14px] text-ellipsis whitespace-pre-wrap">Lorem ipsum dolor sit amet consectetur. Nunc vestibulum suspendisse et non at sollicitudin ut et gravida.</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <SubHeading3 />
    </div>
  );
}

function ContainerCard3() {
  return (
    <div className="bg-[#f5f5f5] flex-[1_0_0] min-h-px min-w-px relative rounded-[8px]" data-name="Container_card">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[12px] py-[10px] relative w-full">
        <Heading3 />
        <RoleTime3 />
        <Container18 />
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Card">
      <Button3 />
      <ContainerCard3 />
    </div>
  );
}

function GroupItemsEverning() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start pb-[12px] relative shrink-0 w-full" data-name="Group-Items/Everning">
      <TimePeriodEvening />
      <Card3 />
    </div>
  );
}

function ItemsCardTimelineDay() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-0 pl-[16px] pr-[20px] top-0 w-[390px]" data-name="Items/Card_timeline_day_1">
      <div className="absolute h-[431px] left-[36px] top-[99px] w-0" data-name="Line-BG/Default">
        <div className="absolute inset-[0_-0.3px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.6 431.6">
            <path d="M0.3 0.3V431.3" id="Line-BG/Default" stroke="var(--stroke-0, #BFBFBE)" strokeLinecap="square" strokeWidth="0.6" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[107px] left-[36px] top-[256px] w-0" data-name="Line-BG/Active">
        <div className="absolute inset-[-0.56%_-0.6px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.2 108.2">
            <path d="M0.6 0.6V107.6" id="Line-BG/Active" stroke="var(--stroke-0, #FF6733)" strokeLinecap="square" strokeWidth="1.2" />
          </svg>
        </div>
      </div>
      <GroupItemsNight />
      <GroupItemsMorning />
      <GroupItemsEverning />
    </div>
  );
}

function ItemsDay1WScroll() {
  return (
    <div className="h-[602px] relative shrink-0 w-[390px]" data-name="Items/Day-1 w scroll">
      <ItemsCardTimelineDay />
    </div>
  );
}

function ItemsCard() {
  return (
    <div className="relative shrink-0 w-full" data-name="Items-Card">
      <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
        <ItemsDay1WScroll />
      </div>
      <div aria-hidden="true" className="absolute border-[#f5f5f5] border-[1.2px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function TitleItemsCardTimeline() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-[390px]" data-name="Title & Items_card/Timeline">
      <Title1 />
      <ItemsCard />
    </div>
  );
}

function MainContent() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start pt-[12px] relative shrink-0 w-full" data-name="Main-content">
      <IndicatorsWPadding />
      <TitleItemsCardTimeline />
    </div>
  );
}

function MainArea() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip pt-[10px] relative shrink-0 w-full" data-name="Main-area">
      <Tabs />
      <MainContent />
    </div>
  );
}

function SafeArea() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Safe-area">
      <HeaderPage />
      <MainArea />
    </div>
  );
}

function IconM3Add() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon_m3/add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon_m3/add">
          <path d={svgPaths.p2a6e0600} fill="var(--fill-0, white)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[28px] w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(121.606deg, rgb(255, 85, 29) 0%, rgb(255, 106, 159) 100%), linear-gradient(90deg, rgb(255, 86, 28) 0%, rgb(255, 86, 28) 100%)" }}>
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[12px] relative size-full">
          <IconM3Add />
          <p className="font-['Inclusive_Sans:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-white" style={{ fontFeatureSettings: "'ss01'" }}>
            Create Event Card
          </p>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[48px] items-center justify-center min-h-px min-w-px relative rounded-[8px]" data-name="Button">
      <Container19 />
    </div>
  );
}

function ButonWPadding() {
  return (
    <div className="content-stretch flex items-start justify-center px-[20px] relative shrink-0 w-[390px]" data-name="Buton w padding">
      <Button4 />
    </div>
  );
}

function HomeIndicator() {
  return (
    <div className="h-[34px] relative shrink-0 w-full" data-name="HomeIndicator">
      <div className="-translate-x-1/2 absolute bg-black bottom-[8px] h-[5px] left-1/2 rounded-[100px] w-[134px]" data-name="Home Indicator" />
    </div>
  );
}

function ButtonHomeIndicator() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-end pt-[12px] relative shrink-0 w-[390px]" data-name="Button & HomeIndicator" style={{ backgroundImage: "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%), linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(234, 234, 233, 0.7) 100%)" }}>
      <ButonWPadding />
      <HomeIndicator />
    </div>
  );
}

export default function DetailPlanTabTimelineDay() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-col items-start relative size-full" data-name="Detail_Plan / Tab_Timeline / Day 3">
      <StatusBar />
      <SafeArea />
      <ButtonHomeIndicator />
    </div>
  );
}
