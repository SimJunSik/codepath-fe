// CodePath - Privacy Policy Page

import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layouts/Header';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: 'CodePath 개인정보처리방침',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-h1 text-text-primary mb-8">개인정보처리방침</h1>

          <div className="prose prose-invert max-w-none space-y-8 text-text-secondary">
            <p className="text-body">
              CodePath(이하 &quot;회사&quot;)는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」을 준수하고 있습니다.
              회사는 개인정보처리방침을 통하여 이용자가 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며,
              개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
            </p>

            <section>
              <h2 className="text-h3 text-text-primary mb-4">1. 수집하는 개인정보 항목</h2>
              <p className="text-body mb-4">회사는 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>필수항목: 이메일 주소, 사용자명, 비밀번호</li>
                <li>선택항목: 이름, 프로필 이미지</li>
                <li>자동수집항목: IP 주소, 쿠키, 서비스 이용 기록, 접속 로그</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary mb-4">2. 개인정보의 수집 및 이용목적</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>회원 가입 및 관리: 회원제 서비스 이용에 따른 본인확인, 개인식별</li>
                <li>서비스 제공: 콘텐츠 제공, 학습 진도 관리, 맞춤형 서비스 제공</li>
                <li>서비스 개선: 신규 서비스 개발 및 마케팅·광고에의 활용</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary mb-4">3. 개인정보의 보유 및 이용기간</h2>
              <p className="text-body">
                회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
                단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
                <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래법)</li>
                <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래법)</li>
                <li>웹사이트 방문기록: 3개월 (통신비밀보호법)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary mb-4">4. 개인정보의 파기절차 및 방법</h2>
              <p className="text-body">
                회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체없이 파기합니다.
                파기절차 및 방법은 다음과 같습니다.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>파기절차: 회원님이 회원가입 등을 위해 입력하신 정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.</li>
                <li>파기방법: 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary mb-4">5. 개인정보의 제3자 제공</h2>
              <p className="text-body">
                회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>이용자가 사전에 동의한 경우</li>
                <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary mb-4">6. 이용자의 권리와 그 행사방법</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있습니다.</li>
                <li>이용자는 언제든지 개인정보 수집 및 이용 동의를 철회할 수 있습니다.</li>
                <li>이용자가 개인정보의 오류에 대한 정정을 요청한 경우, 정정을 완료하기 전까지 해당 개인정보를 이용하지 않습니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary mb-4">7. 쿠키(Cookie)의 운용 및 거부</h2>
              <p className="text-body mb-4">
                회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 &apos;쿠키(cookie)&apos;를 사용합니다.
              </p>
              <p className="text-body">
                이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나,
                쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary mb-4">8. 개인정보 보호책임자</h2>
              <p className="text-body">
                회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만처리 및 피해구제를 위하여
                아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
              </p>
              <div className="mt-4 p-4 bg-bg-elevated rounded-lg border border-border">
                <p className="text-body"><strong>개인정보 보호책임자</strong></p>
                <p className="text-body-sm mt-2">이메일: privacy@codepath.cloud</p>
              </div>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary mb-4">9. 개인정보처리방침 변경</h2>
              <p className="text-body">
                이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는
                변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </section>

            <div className="mt-12 p-4 bg-bg-elevated rounded-lg border border-border">
              <p className="text-body-sm text-text-tertiary">
                본 방침은 2026년 1월 29일부터 시행됩니다.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link href="/" className="text-accent hover:text-accent-hover transition-colors">
              ← 홈으로 돌아가기
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
