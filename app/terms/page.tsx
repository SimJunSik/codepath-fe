// CodePath - Terms of Service Page

import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layouts/Header';

export const metadata: Metadata = {
  title: '이용약관',
  description: 'CodePath 서비스 이용약관',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-h1 text-text-primary mb-8">이용약관</h1>

          <div className="prose prose-invert max-w-none space-y-8 text-text-secondary">
            <section>
              <h2 className="text-h3 text-text-primary mb-4">제1조 (목적)</h2>
              <p className="text-body">
                이 약관은 CodePath(이하 &quot;회사&quot;)가 제공하는 온라인 학습 서비스(이하 &quot;서비스&quot;)의 이용과 관련하여
                회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary mb-4">제2조 (정의)</h2>
              <ul className="list-decimal pl-6 space-y-2">
                <li>&quot;서비스&quot;라 함은 회사가 제공하는 Python 학습 퀴즈 및 관련 콘텐츠를 말합니다.</li>
                <li>&quot;이용자&quot;라 함은 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                <li>&quot;회원&quot;이라 함은 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary mb-4">제3조 (약관의 효력 및 변경)</h2>
              <ul className="list-decimal pl-6 space-y-2">
                <li>이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.</li>
                <li>회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 변경할 수 있습니다.</li>
                <li>약관이 변경되는 경우 회사는 변경사항을 시행일자 7일 전부터 서비스 공지사항에서 공지합니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary mb-4">제4조 (서비스의 제공)</h2>
              <p className="text-body mb-4">회사는 다음과 같은 서비스를 제공합니다.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Python 프로그래밍 관련 퀴즈 및 학습 콘텐츠</li>
                <li>학습 진도 관리 및 통계</li>
                <li>기타 회사가 정하는 서비스</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary mb-4">제5조 (회원가입)</h2>
              <ul className="list-decimal pl-6 space-y-2">
                <li>이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.</li>
                <li>회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
                    <li>등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                    <li>기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary mb-4">제6조 (회원 탈퇴 및 자격 상실)</h2>
              <ul className="list-decimal pl-6 space-y-2">
                <li>회원은 회사에 언제든지 탈퇴를 요청할 수 있으며, 회사는 즉시 회원탈퇴를 처리합니다.</li>
                <li>회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한 및 정지시킬 수 있습니다.
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>가입 신청 시에 허위 내용을 등록한 경우</li>
                    <li>다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우</li>
                    <li>서비스를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary mb-4">제7조 (이용자의 의무)</h2>
              <p className="text-body mb-4">이용자는 다음 행위를 하여서는 안 됩니다.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>신청 또는 변경 시 허위 내용의 등록</li>
                <li>타인의 정보 도용</li>
                <li>회사가 게시한 정보의 변경</li>
                <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                <li>회사 및 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary mb-4">제8조 (저작권의 귀속 및 이용제한)</h2>
              <ul className="list-decimal pl-6 space-y-2">
                <li>회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.</li>
                <li>이용자는 서비스를 이용함으로써 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary mb-4">제9조 (면책조항)</h2>
              <ul className="list-decimal pl-6 space-y-2">
                <li>회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
                <li>회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</li>
                <li>회사는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖의 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 text-text-primary mb-4">제10조 (분쟁해결)</h2>
              <ul className="list-decimal pl-6 space-y-2">
                <li>회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.</li>
                <li>회사와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 대한민국 법을 적용합니다.</li>
              </ul>
            </section>

            <div className="mt-12 p-4 bg-bg-elevated rounded-lg border border-border">
              <p className="text-body-sm text-text-tertiary">
                본 약관은 2026년 1월 29일부터 시행됩니다.
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
