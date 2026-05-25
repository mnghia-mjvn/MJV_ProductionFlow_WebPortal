import svgPaths from "./svg-km0hk690a";
import imgImage from "./0758065b09caa1922ffaa90cb45af61cd56f3f89.png";
import imgContainer from "./a8e25246cbd5170e1c08802d1800fdf3d453e317.png";
import imgMicrosoftLogo from "./b413fa58018f84bf9393d355080ec7aec0b04a67.png";
import imgGoogleLogo from "./5f9849d48a93a090005402daafc8ef822895df44.png";

function Image() {
  return (
    <div className="absolute h-[44px] left-[40px] right-[1110px] top-[18px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function IconStroke() {
  return (
    <div className="absolute contents inset-0" data-name="Icon stroke">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5">
        <path d={svgPaths.p11b35380} fill="var(--fill-0, #5E6573)" id="Vector" />
      </svg>
      <div className="absolute inset-[4.65%_60.46%_4.65%_25.83%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.94827 19.5">
          <path d={svgPaths.p1ba43800} fill="var(--fill-0, #5E6573)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[4.61%_25.8%_4.65%_60.45%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.95485 19.5085">
          <path d={svgPaths.p2af34300} fill="var(--fill-0, #5E6573)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[60.46%_4.6%_25.81%_4.65%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.51 2.95077">
          <path d={svgPaths.p2bff7e80} fill="var(--fill-0, #5E6573)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[25.8%_4.69%_60.47%_4.63%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.496 2.9525">
          <path d={svgPaths.p9149900} fill="var(--fill-0, #5E6573)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[21.5px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <IconStroke />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col h-[21.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] pt-[1.25px] px-[1.25px] size-[24px] top-[8px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute content-stretch flex h-[19.6px] items-start left-[48px] top-[10.2px] w-[18.925px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Noto_Sans:SemiBold',sans-serif] font-semibold leading-[19.6px] relative shrink-0 text-[#5e6573] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
        EN
      </p>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[40px] right-[39px] rounded-[12px] top-[20px] w-[80px]" style={{ backgroundImage: "linear-gradient(151.4deg, rgba(255, 255, 255, 0.9) 18.668%, rgba(255, 255, 255, 0.5) 49.153%, rgba(255, 255, 255, 0.9) 81.961%)" }} data-name="Container">
      <Container1 />
      <Paragraph />
    </div>
  );
}

function HeaderContainer() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="HeaderContainer">
      <Image />
      <Container />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[86.4px] items-start relative shrink-0 w-[413.925px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Sofia_Sans_Extra_Condensed:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[72px] text-center text-white whitespace-nowrap">PRODUCTION FLOW</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[660px] items-center justify-center overflow-clip px-[212.637px] relative shrink-0 w-[674px]" data-name="Container">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgContainer} />
        <div className="absolute bg-[rgba(0,0,0,0.5)] inset-0" />
      </div>
      <Paragraph1 />
    </div>
  );
}

function InputTextField() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative rounded-[12px] w-full" data-name="Input text field">
      <div aria-hidden="true" className="absolute border border-[#e1e5ed] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="outline/user-03">
            <div className="absolute inset-[9.38%_9.37%_13.54%_9.37%]" data-name="Icon stroke">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 18.5">
                <path clipRule="evenodd" d={svgPaths.pe061c80} fill="var(--fill-0, #0F0F0F)" fillRule="evenodd" id="Icon stroke" />
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[1.4] min-w-px overflow-hidden relative text-[#0f0f0f] text-[14px] text-ellipsis whitespace-nowrap">jane.doe@mi-jackvietnam.com</p>
        </div>
      </div>
    </div>
  );
}

function Lable() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-center justify-center left-[8px] px-[4px] top-[-10px]" data-name="Lable">
      <div className="absolute bg-white h-[7px] left-[2.5%] right-0 top-[10px]" data-name="Background" />
      <p className="[word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[1.4] overflow-hidden relative shrink-0 text-[#5e6573] text-[14px] text-ellipsis whitespace-nowrap">Username</p>
    </div>
  );
}

function InputTextField1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative rounded-[12px] w-full" data-name="Input text field">
      <div aria-hidden="true" className="absolute border border-[#e1e5ed] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="outline/lock-02">
            <div className="absolute inset-[9.38%_9.38%_9.38%_9.37%]" data-name="Icon stroke">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.5 19.5">
                <path clipRule="evenodd" d={svgPaths.p982400} fill="var(--fill-0, #0F0F0F)" fillRule="evenodd" id="Icon stroke" />
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[1.4] min-w-px overflow-hidden relative text-[#0f0f0f] text-[14px] text-ellipsis whitespace-nowrap">********</p>
          <div className="overflow-clip relative shrink-0 size-[24px]" data-name="outline/eye-off">
            <div className="absolute inset-[9.38%_5.86%]" data-name="Icon stroke">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.1883 19.5">
                <path clipRule="evenodd" d={svgPaths.p20297100} fill="var(--fill-0, #0F0F0F)" fillRule="evenodd" id="Icon stroke" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Lable1() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-center justify-center left-[8px] px-[4px] top-[-10px]" data-name="Lable">
      <div className="absolute bg-white h-[7px] left-[2.5%] right-0 top-[10px]" data-name="Background" />
      <p className="[word-break:break-word] font-['Manrope:Regular',sans-serif] font-normal leading-[1.4] overflow-hidden relative shrink-0 text-[#5e6573] text-[14px] text-ellipsis whitespace-nowrap">Password</p>
    </div>
  );
}

function Fields() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Fields">
      <div className="content-stretch flex flex-col gap-[4px] h-[48px] items-start relative shrink-0 w-full" data-name="Text input/Mobile">
        <InputTextField />
        <Lable />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] h-[48px] items-start relative shrink-0 w-full" data-name="Text input/Mobile">
        <InputTextField1 />
        <Lable1 />
      </div>
    </div>
  );
}

function Checkbox() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" data-name="Checkbox">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Checkbox">
          <path d={svgPaths.p3d570e80} fill="var(--fill-0, #2F6BFF)" />
          <path d={svgPaths.p3d570e80} stroke="var(--stroke-0, #2F6BFF)" strokeWidth="1.5" />
          <path d="M15 7L8.32955 13L5 10" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function ForgotPasswordContainer() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Forgot Password Container">
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Selection controls-label">
        <button className="block cursor-pointer relative shrink-0 size-[24px]" data-name="Selection controls">
          <Checkbox />
        </button>
        <p className="[word-break:break-word] font-['Noto_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#535965] text-[14px] whitespace-nowrap">Remember me</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-[32px] items-center justify-end min-w-px py-[4px] relative rounded-[12px]" data-name="Button">
        <p className="[word-break:break-word] font-['Noto_Sans:SemiBold',sans-serif] font-semibold leading-[1.4] relative shrink-0 text-[#0d2b5e] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
          Forgot Password?
        </p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[380px]">
      <Fields />
      <ForgotPasswordContainer />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0 w-[380px]" data-name="Button">
      <div className="content-stretch flex gap-[12px] h-[46px] items-start overflow-clip relative rounded-[12px] shrink-0 w-[380px]" data-name="Button group">
        <div className="bg-[#0d2b5e] flex-[1_0_0] min-w-px relative rounded-[12px] self-stretch" data-name="Button">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[32px] py-[12px] relative size-full">
              <p className="[word-break:break-word] font-['Noto_Sans:SemiBold',sans-serif] font-semibold leading-[1.4] relative shrink-0 text-[#fcfcfc] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
                Login
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SsoOptions() {
  return (
    <div className="bg-white content-stretch flex h-[21px] items-center justify-center overflow-clip px-[38px] py-[8px] relative shrink-0 w-[380px]" data-name="SSO options">
      <p className="[word-break:break-word] font-['Noto_Sans:Regular',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[#535965] text-[14px] whitespace-nowrap">Or continue with</p>
    </div>
  );
}

function SsoButton() {
  return (
    <div className="bg-white h-[48px] relative rounded-[12px] shrink-0 w-[380px]" data-name="SSO Button">
      <div className="content-stretch flex gap-[10px] items-center justify-center overflow-clip px-[119px] py-[13px] relative rounded-[inherit] size-full">
        <div className="relative shrink-0 size-[32px]" data-name="MicrosoftLogo">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMicrosoftLogo} />
        </div>
        <p className="[word-break:break-word] font-['Noto_Sans:SemiBold',sans-serif] font-semibold leading-[1.4] relative shrink-0 text-[#535965] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
          Microsoft
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#535965] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function SsoButton1() {
  return (
    <div className="bg-white h-[48px] relative rounded-[12px] shrink-0 w-[380px]" data-name="SSO Button">
      <div className="content-stretch flex gap-[10px] items-center justify-center overflow-clip px-[119px] py-[13px] relative rounded-[inherit] size-full">
        <div className="relative shrink-0 size-[32px]" data-name="GoogleLogo">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgGoogleLogo} />
        </div>
        <p className="[word-break:break-word] font-['Noto_Sans:SemiBold',sans-serif] font-semibold leading-[1.4] relative shrink-0 text-[#535965] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}>
          Google
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#535965] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Form() {
  return (
    <div className="h-[490px] relative rounded-[20px] shadow-[0px_4px_32px_0px_rgba(89,93,176,0.08)] shrink-0 w-[480px]" style={{ backgroundImage: "linear-gradient(112.042deg, rgba(255, 255, 255, 0.9) 17.374%, rgba(255, 255, 255, 0.5) 49.118%, rgba(255, 255, 255, 0.9) 83.281%)" }} data-name="Form">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[20px] items-center justify-center pb-[20px] pt-[24px] px-[20px] relative size-full">
        <Frame />
        <Button />
        <SsoOptions />
        <SsoButton />
        <SsoButton1 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[659px] items-center justify-center px-[179.6px] py-[40px] relative shrink-0 w-[666px]" data-name="Container">
      <Form />
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-white content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container5 />
    </div>
  );
}

function IconStroke1() {
  return (
    <div className="absolute contents inset-0" data-name="Icon stroke">
      <div className="absolute inset-[0_0_18.6%_0]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.875 13.125">
          <path d={svgPaths.p7eb4d80} fill="var(--fill-0, #0D2B5E)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[60.47%_0_0_0]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.875 6.375">
          <path d={svgPaths.p2f702700} fill="var(--fill-0, #0D2B5E)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[23.26%_24.32%_69.77%_24.32%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.125 1.125">
          <path d={svgPaths.p6202b00} fill="var(--fill-0, #0D2B5E)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[39.53%_40.54%_53.49%_24.32%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.875 1.125">
          <path d={svgPaths.p23b46d00} fill="var(--fill-0, #0D2B5E)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[16.125px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <IconStroke1 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col h-[16.125px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon1 />
    </div>
  );
}

function FooterContainer1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pt-[0.938px] px-[2.063px] size-[18px] top-[0.8px]" data-name="FooterContainer">
      <Container6 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute content-stretch flex h-[19.6px] items-start left-[22px] top-0 w-[71.65px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Noto_Sans:Regular',sans-serif] leading-[19.6px] not-italic relative shrink-0 text-[#0d2b5e] text-[14px] whitespace-nowrap">User guide</p>
    </div>
  );
}

function FooterLink() {
  return (
    <div className="h-[19.6px] relative shrink-0 w-[93.65px]" data-name="FooterLink">
      <FooterContainer1 />
      <Paragraph2 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[16.125px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.125 16.125">
        <path clipRule="evenodd" d={svgPaths.p334ea100} fill="var(--fill-0, #0D2B5E)" fillRule="evenodd" id="Icon stroke" />
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col h-[16.125px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon2 />
    </div>
  );
}

function FooterContainer2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 overflow-clip pt-[0.938px] px-[0.938px] size-[18px] top-[0.8px]" data-name="FooterContainer">
      <Container7 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute content-stretch flex h-[19.6px] items-start left-[22px] top-0 w-[33.588px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Noto_Sans:Regular',sans-serif] leading-[19.6px] not-italic relative shrink-0 text-[#0d2b5e] text-[14px] whitespace-nowrap">FAQs</p>
    </div>
  );
}

function FooterLink1() {
  return (
    <div className="h-[19.6px] relative shrink-0 w-[55.588px]" data-name="FooterLink">
      <FooterContainer2 />
      <Paragraph3 />
    </div>
  );
}

function IconStroke2() {
  return (
    <div className="absolute contents inset-0" data-name="Icon stroke">
      <div className="absolute inset-[46.51%_0_0_0]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.65 8.625">
          <path d={svgPaths.p34d0ef80} fill="var(--fill-0, #0D2B5E)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0_10.35%_46.51%_10.25%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6329 8.625">
          <path d={svgPaths.p18776f31} fill="var(--fill-0, #0D2B5E)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[33.63%_36.58%_59.4%_38.68%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.62497 1.125">
          <path d={svgPaths.p3d3d6e80} fill="var(--fill-0, #0D2B5E)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[19.67%_32.27%_73.35%_34.43%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.87833 1.125">
          <path d={svgPaths.p22919920} fill="var(--fill-0, #0D2B5E)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[16.125px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <IconStroke2 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[16.125px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function FooterContainer3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pl-[1.688px] pr-[1.662px] pt-[0.938px] size-[18px] top-[0.8px]" data-name="FooterContainer">
      <Container8 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute content-stretch flex h-[19.6px] items-start left-[22px] top-0 w-[50.65px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Noto_Sans:Regular',sans-serif] leading-[19.6px] not-italic relative shrink-0 text-[#0d2b5e] text-[14px] whitespace-nowrap">Contact</p>
    </div>
  );
}

function FooterLink2() {
  return (
    <div className="h-[19.6px] relative shrink-0 w-[72.65px]" data-name="FooterLink">
      <FooterContainer3 />
      <Paragraph4 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[16.125px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8875 16.125">
        <path clipRule="evenodd" d={svgPaths.pc34a600} fill="var(--fill-0, #0D2B5E)" fillRule="evenodd" id="Icon stroke" />
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col h-[16.125px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon4 />
    </div>
  );
}

function FooterContainer4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 overflow-clip pl-[2.425px] pr-[1.688px] pt-[0.938px] size-[18px] top-[0.8px]" data-name="FooterContainer">
      <Container9 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute content-stretch flex h-[19.6px] items-start left-[22px] top-0 w-[26.888px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Noto_Sans:Regular',sans-serif] leading-[19.6px] not-italic relative shrink-0 text-[#0d2b5e] text-[14px] whitespace-nowrap">{`T&C`}</p>
    </div>
  );
}

function FooterLink3() {
  return (
    <div className="h-[19.6px] relative shrink-0 w-[48.888px]" data-name="FooterLink">
      <FooterContainer4 />
      <Paragraph5 />
    </div>
  );
}

function FooterContainer() {
  return (
    <div className="bg-white h-[60px] relative shrink-0 w-full" data-name="FooterContainer">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[32px] items-center justify-center px-[656px] py-[20px] relative size-full">
          <FooterLink />
          <FooterLink1 />
          <FooterLink2 />
          <FooterLink3 />
        </div>
      </div>
    </div>
  );
}

function Login() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[800px] items-start relative shrink-0 w-[1340px]" data-name="Login">
      <HeaderContainer />
      <Container3 />
      <FooterContainer />
    </div>
  );
}

export default function TabletLogin() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start pr-[-0.4px] relative size-full" data-name="Tablet - Login 1.1.2">
      <Login />
    </div>
  );
}