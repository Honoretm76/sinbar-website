import { useState, useEffect, type ReactNode } from "react";
import { Link } from "wouter";
import {
  FileText, Clock, Briefcase, Users, DollarSign, Headphones,
  Receipt, ShieldCheck, Shield, AlertTriangle, Lightbulb,
  Calendar, FileEdit, UserCheck, Settings, Database,
  FileCode, XCircle, CreditCard, Wrench, Scale, Lock,
  AlertOctagon, Gavel, ChevronUp, ChevronDown, ArrowLeft,
  Mail, Phone, MessageCircle,
} from "lucide-react";

const GOLD = "#C9A84C";
const GOLD_RGB = "201,168,76";
const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427955080/ZxXCJe99gzkbKiEMDdcDKE";
const LOGO = `${CDN}/sinbar-3d-logo-black-bg_270317ec.png`;

/* ------------------------------------------------------------------ */
/* Accordion Section Component                                         */
/* ------------------------------------------------------------------ */
function LegalSection({
  icon: Icon,
  title,
  sectionNumber,
  children,
  defaultOpen = false,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  sectionNumber: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b" style={{ borderColor: `rgba(${GOLD_RGB},0.1)` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 py-5 px-6 text-left hover:bg-white/5 transition-colors"
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `rgba(${GOLD_RGB},0.1)` }}
        >
          <Icon className="w-5 h-5" style={{ color: GOLD }} />
        </div>
        <div className="flex-1">
          <span className="text-xs font-bold text-gray-500">Section {sectionNumber}</span>
          <h3 className="text-white font-semibold font-['Sora'] text-sm">{title}</h3>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-6 pl-20 text-sm text-gray-400 leading-relaxed space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Rate Table Row                                                       */
/* ------------------------------------------------------------------ */
function RateRow({ role, rate, range }: { role: string; rate: string; range?: string }) {
  return (
    <div className="grid grid-cols-3 py-3 border-b border-white/5 text-sm">
      <div className="text-gray-300">{role}</div>
      <div className="text-white font-semibold text-center">{rate}</div>
      {range && <div className="text-gray-500 text-right">{range}</div>}
    </div>
  );
}

function EquipmentRow({ type, rate }: { type: string; rate: string }) {
  return (
    <div className="grid grid-cols-2 py-3 border-b border-white/5 text-sm">
      <div className="text-gray-300">{type}</div>
      <div className="text-white font-semibold text-right">{rate}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Legal Page                                                           */
/* ------------------------------------------------------------------ */
export default function Legal() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-gray-400" style={{ backgroundColor: "#050505" }}>
      {/* Header */}
      <header className="py-6" style={{ borderBottom: `1px solid rgba(${GOLD_RGB},0.1)` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src={LOGO} alt="Sinbar" className="w-8 h-8 rounded-lg" />
            <span className="text-white font-bold font-['Sora']">Sinbar Consultants LLC</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm hover:text-white transition-colors" style={{ color: GOLD }}>
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: `rgba(${GOLD_RGB},0.1)`, border: `1px solid rgba(${GOLD_RGB},0.2)` }}
          >
            <Scale className="w-4 h-4" style={{ color: GOLD }} />
            <span className="text-xs font-bold" style={{ color: GOLD }}>LEGAL DOCUMENTS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-['Sora'] text-white mb-4">
            Master Service Agreement
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-6">
            This Master Service Agreement (&ldquo;Agreement&rdquo;) governs all services provided by Sinbar Consultants LLC to its clients. Last updated March 2026.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span>Effective: March 2026</span>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span>Version 1.0</span>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span>New York, NY</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Parties Box */}
          <div className="rounded-2xl mb-8 p-6" style={{ backgroundColor: "#0d0d0d", border: `1px solid rgba(${GOLD_RGB},0.15)` }}>
            <h2 className="text-white font-bold font-['Sora'] mb-4">Parties to This Agreement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl p-4" style={{ backgroundColor: `rgba(${GOLD_RGB},0.05)`, border: `1px solid rgba(${GOLD_RGB},0.1)` }}>
                <div className="text-xs font-bold mb-2" style={{ color: GOLD }}>SERVICE PROVIDER</div>
                <div className="text-white font-semibold">Sinbar Consultants LLC</div>
                <div className="text-sm text-gray-500 mt-1">2040 White Plains Rd #1036</div>
                <div className="text-sm text-gray-500">Bronx, NY 10462</div>
                <div className="text-sm text-gray-500 mt-2">support@sinbarconsultants.com</div>
                <div className="text-sm text-gray-500">(347) 720-0367</div>
              </div>
              <div className="rounded-xl p-4" style={{ backgroundColor: `rgba(${GOLD_RGB},0.05)`, border: `1px solid rgba(${GOLD_RGB},0.1)` }}>
                <div className="text-xs font-bold mb-2" style={{ color: GOLD }}>CLIENT</div>
                <div className="text-white font-semibold">The undersigned client entity</div>
                <div className="text-sm text-gray-500 mt-1">As identified in the applicable Schedule of Work</div>
              </div>
            </div>
          </div>

          {/* Labor & Hourly Rates */}
          <div className="rounded-2xl mb-8 p-6" style={{ backgroundColor: "#0d0d0d", border: `1px solid rgba(${GOLD_RGB},0.15)` }}>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5" style={{ color: GOLD }} />
              <h2 className="text-white font-bold font-['Sora']">Labor & Hourly Rates</h2>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              The following rates apply to all project-based and hourly work performed under this Agreement. Rates are reviewed annually and subject to a maximum 4% annual increase.
            </p>
            <div className="grid grid-cols-3 py-2 border-b border-white/10 text-xs font-bold text-gray-500">
              <div>Role / Service</div>
              <div className="text-center">Hourly Rate</div>
              <div className="text-right">Market Range (NYC)</div>
            </div>
            <RateRow role="Wireless Field Technician" rate="$175/hr" range="$150 – $200/hr" />
            <RateRow role="Senior Wireless Field Technician" rate="$225/hr" range="$200 – $275/hr" />
            <RateRow role="Wireless Network Engineer" rate="$275/hr" range="$225 – $300/hr" />
            <RateRow role="Senior Wireless Network Engineer" rate="$325/hr" range="$275 – $350/hr" />
            <RateRow role="Planning Services (PM, Consultant, Architect)" rate="$300/hr" range="$250 – $400/hr" />
            <p className="text-xs text-gray-600 mt-4">
              *Rates effective March 2026. After-hours and emergency work may be billed at 1.5x standard rates. Travel time is billed at the applicable hourly rate.
            </p>
          </div>

          {/* Configured Environment — Monthly Rates */}
          <div className="rounded-2xl mb-8 p-6" style={{ backgroundColor: "#0d0d0d", border: `1px solid rgba(${GOLD_RGB},0.15)` }}>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5" style={{ color: GOLD }} />
              <h2 className="text-white font-bold font-['Sora']">Configured Environment — Monthly Rates</h2>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Monthly per-device charges for managed equipment under an active service agreement.
            </p>
            <div className="grid grid-cols-2 py-2 border-b border-white/10 text-xs font-bold text-gray-500">
              <div>Equipment Type</div>
              <div className="text-right">Monthly Rate (per device)</div>
            </div>
            <EquipmentRow type="Firewall" rate="$175.00" />
            <EquipmentRow type="Access Point" rate="$55.00" />
            <EquipmentRow type="Managed Switch" rate="$125.00" />
            <EquipmentRow type="Wireless Controller" rate="$175.00" />
            <EquipmentRow type="Hosted Phone" rate="$65.00" />
          </div>

          {/* Agreement Terms & Conditions */}
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#0d0d0d", border: `1px solid rgba(${GOLD_RGB},0.15)` }}>
            <div className="p-6 pb-2">
              <h2 className="text-white font-bold font-['Sora'] mb-1">Agreement Terms & Conditions</h2>
              <p className="text-sm text-gray-500">Click each section to expand</p>
            </div>

            <LegalSection icon={FileText} title="Scope of Agreement" sectionNumber="1" defaultOpen>
              <p>This Master Service Agreement (&ldquo;Agreement&rdquo;) is entered into between Sinbar Consultants LLC (&ldquo;Service Provider&rdquo;) and the undersigned client (&ldquo;Client&rdquo;). This Agreement sets forth the general terms and conditions under which Service Provider will provide services to Client. Specific services, deliverables, and pricing will be detailed in individual Schedules of Work (&ldquo;Schedules&rdquo;) that reference and are governed by this Agreement.</p>
              <p>Each Schedule, together with this Agreement, constitutes the entire agreement between the parties with respect to the services described in such Schedule. In the event of a conflict between this Agreement and any Schedule, the terms of the Schedule shall prevail with respect to the services described therein.</p>
            </LegalSection>

            <LegalSection icon={Clock} title="Term" sectionNumber="2">
              <p>This Agreement shall commence on the date of execution by both parties and shall continue for an initial term of twelve (12) months (&ldquo;Initial Term&rdquo;). Following the Initial Term, this Agreement shall automatically renew for successive twelve (12) month periods (&ldquo;Renewal Terms&rdquo;) unless either party provides written notice of non-renewal at least thirty (30) days prior to the end of the then-current term.</p>
              <p>Individual Schedules may specify different terms, which shall govern the duration of the services described therein.</p>
            </LegalSection>

            <LegalSection icon={Briefcase} title="Service Provider's Obligations" sectionNumber="3">
              <p>Service Provider shall provide the services described in each Schedule in a professional and workmanlike manner, consistent with generally accepted industry standards. Service Provider shall assign qualified personnel to perform the services and shall maintain all necessary licenses and certifications required to perform such services.</p>
              <p>Service Provider shall use commercially reasonable efforts to meet any performance dates specified in a Schedule, provided that such dates are estimates only and are not binding commitments unless expressly stated otherwise in the applicable Schedule.</p>
            </LegalSection>

            <LegalSection icon={Users} title="Client's Obligations" sectionNumber="4">
              <p>Client shall provide Service Provider with timely access to Client&rsquo;s premises, systems, and personnel as reasonably necessary for Service Provider to perform the services. Client shall designate a primary point of contact who shall have authority to make decisions on behalf of Client regarding the services.</p>
              <p>Client shall be responsible for maintaining current backups of all data, software, and configurations prior to any service engagement. Client acknowledges that certain services may require downtime and agrees to coordinate scheduling with Service Provider to minimize business disruption.</p>
            </LegalSection>

            <LegalSection icon={DollarSign} title="Fees and Payment" sectionNumber="5">
              <p><strong className="text-gray-300">Deposit Requirement:</strong> A deposit of 50% of the estimated project cost is required before work begins on any project-based engagement. For managed services, the first month&rsquo;s fee is due upon execution of the applicable Schedule.</p>
              <p><strong className="text-gray-300">Payment Terms:</strong> All invoices are due within thirty (30) days of the invoice date. Late payments shall accrue interest at the rate of 1.5% per month or the maximum rate permitted by law, whichever is less.</p>
              <p><strong className="text-gray-300">Returned Payments:</strong> A fee of $35.00 will be assessed for any returned check or failed electronic payment.</p>
              <p><strong className="text-gray-300">Rate Adjustments:</strong> Service Provider reserves the right to adjust rates annually, with a maximum increase of 4% per year. Client will be notified in writing at least sixty (60) days prior to any rate adjustment.</p>
            </LegalSection>

            <LegalSection icon={Headphones} title="Business Hours and Support" sectionNumber="6">
              <p>Standard business hours are Monday through Friday, 8:00 AM to 7:00 PM Eastern Time, and Saturday, 9:00 AM to 3:00 PM Eastern Time. 24/7 emergency support is available for clients with active managed service agreements that include emergency support provisions.</p>
              <p>Response times are specified in the applicable Schedule and vary based on the service tier selected by Client.</p>
            </LegalSection>

            <LegalSection icon={Receipt} title="Taxes" sectionNumber="7">
              <p>All fees quoted are exclusive of applicable taxes. Client shall be responsible for all sales, use, value-added, and other taxes arising from the services provided under this Agreement, excluding taxes based on Service Provider&rsquo;s net income.</p>
            </LegalSection>

            <LegalSection icon={ShieldCheck} title="Representations and Warranties" sectionNumber="8">
              <p>Each party represents and warrants that: (i) it has the legal power and authority to enter into this Agreement; (ii) the execution of this Agreement does not conflict with any other agreement to which it is a party; and (iii) it will comply with all applicable laws and regulations in the performance of its obligations under this Agreement.</p>
            </LegalSection>

            <LegalSection icon={Shield} title="Insurance" sectionNumber="9">
              <p>Service Provider shall maintain commercially reasonable insurance coverage, including general liability, professional liability (errors and omissions), and workers&rsquo; compensation insurance, throughout the term of this Agreement. Certificates of insurance shall be provided to Client upon request.</p>
            </LegalSection>

            <LegalSection icon={AlertTriangle} title="Limitation of Liability" sectionNumber="10">
              <p className="uppercase font-semibold text-gray-300">NEITHER PARTY SHALL BE LIABLE TO THE OTHER FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT, REGARDLESS OF THE FORM IN WHICH AN ACTION IS BROUGHT IN LAW, EQUITY, CONTRACT, OR TORT (INCLUDING NEGLIGENCE AND STRICT LIABILITY), EVEN IF A PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
              <p className="uppercase font-semibold text-gray-300">IN NO EVENT SHALL SERVICE PROVIDER&rsquo;S AGGREGATE LIABILITY TO CLIENT UNDER OR RELATED TO THIS AGREEMENT EXCEED THE TOTAL FEES PAID BY CLIENT TO SERVICE PROVIDER DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO SUCH LIABILITY.</p>
            </LegalSection>

            <LegalSection icon={Lightbulb} title="Intellectual Property" sectionNumber="11">
              <p><strong className="text-gray-300">Service Provider Rights:</strong> All tools, methodologies, processes, and pre-existing intellectual property used by Service Provider in the delivery of services shall remain the exclusive property of Service Provider. Client is granted a non-exclusive, non-transferable license to use any deliverables created specifically for Client under this Agreement.</p>
            </LegalSection>

            <LegalSection icon={Calendar} title="Scheduling and Access" sectionNumber="12">
              <p>Client must provide not less than 24-hour written notice of cancellation prior to commencement of any specific project or task to be billed on an hourly basis. If Client provides less than 24-hour notice, Service Provider reserves the right to bill for any travel time plus one (1) hour of labor in addition to the cost of the return visit.</p>
              <p>In the event that a technician is denied physical access to any required systems, this will be considered a cancellation of service and above charges will be assessed to Client.</p>
            </LegalSection>

            <LegalSection icon={FileEdit} title="Change Orders" sectionNumber="13">
              <p>All changes made to any Schedule under this Agreement must be made in writing and must be signed by both Service Provider and Client. No verbal modifications shall be binding on either party.</p>
            </LegalSection>

            <LegalSection icon={UserCheck} title="Use of Sub-Contractors" sectionNumber="14">
              <p>From time to time, with the prior written consent of Client, Service Provider may engage the services of contractors or sub-contractors for work performed as part of this Agreement, provided that such subcontractors are bound by terms at least as stringent as the terms that Service Provider is bound by under this Agreement. Service Provider shall remain responsible for all services provided by such subcontractors.</p>
            </LegalSection>

            <LegalSection icon={Settings} title="Alteration to Services" sectionNumber="15">
              <p>If Client alters any services or equipment provided by Service Provider without the express written consent of Service Provider, Client does so at its own risk and expense. Service Provider shall not be liable or responsible for problems created as a result of Client&rsquo;s alteration of services or equipment. If Client wishes Service Provider to correct or repair any systems adversely affected by such alterations, such services will be considered a new project and will be subject to an applicable Schedule.</p>
            </LegalSection>

            <LegalSection icon={Database} title="Backup Responsibility" sectionNumber="16">
              <p>Except as otherwise expressly agreed by the parties in writing, Client shall be responsible for having backup of all critical software, documents, and applications on all of Client&rsquo;s servers, systems, workstations, and any other electronic devices.</p>
            </LegalSection>

            <LegalSection icon={FileCode} title="Software Licensing" sectionNumber="17">
              <p>Client warrants that all software it provides to Service Provider for installation, configuration, or use has been legally obtained and is properly licensed. Client shall be solely responsible and liable for all licensing and purchasing of software. Client indemnifies Service Provider against any third-party claims for violation of software licenses, to the extent not due to the negligence or willful misconduct of Service Provider.</p>
            </LegalSection>

            <LegalSection icon={XCircle} title="Termination" sectionNumber="18">
              <p>Either party may terminate this Agreement or any Schedule: (i) for convenience upon sixty (60) days&rsquo; prior written notice; (ii) immediately upon written notice if the other party materially breaches this Agreement and fails to cure such breach within thirty (30) days of receiving written notice thereof; or (iii) immediately upon written notice if the other party becomes insolvent, files for bankruptcy, or ceases to conduct business in the normal course.</p>
            </LegalSection>

            <LegalSection icon={CreditCard} title="Effect of Termination" sectionNumber="19">
              <p>In the event of termination, Client shall pay Service Provider any accrued but unpaid sums due under any existing agreements, reduced by all prior payments. If terminated by Client for reasons other than those specified in Section 18, Client shall be responsible for payment of all fees through the end of the then current term.</p>
            </LegalSection>

            <LegalSection icon={Wrench} title="Warranty Policy" sectionNumber="20">
              <p>Warranty on all materials and supplies shall be the manufacturer&rsquo;s warranty. Service Provider shall ensure that manufacturer&rsquo;s warranties will be assigned to Client. EXCEPT AS OTHERWISE PROVIDED, SERVICE PROVIDER MAKES NO EXPRESS OR IMPLIED WARRANTIES, INCLUDING WITHOUT LIMITATION THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.</p>
            </LegalSection>

            <LegalSection icon={Scale} title="Compliance, Indemnification, Technology Limitations & Maintenance" sectionNumber="21–24">
              <p><strong className="text-gray-300">Compliance with Laws:</strong> Both parties shall comply with all applicable federal, state, and local laws, regulations, and ordinances in the performance of their obligations under this Agreement. Service Provider shall maintain all licenses and certifications required to perform the services.</p>
              <p><strong className="text-gray-300">Limitations of Technology:</strong> Client acknowledges that technology solutions are not infallible and that Service Provider cannot guarantee that all security threats will be prevented or that all systems will operate without interruption. Service Provider shall use commercially reasonable efforts to minimize risks and maintain system availability.</p>
              <p><strong className="text-gray-300">Overnight Maintenance:</strong> Service Provider may perform routine maintenance and updates during non-business hours. Client will be notified in advance of any planned maintenance that may affect service availability.</p>
            </LegalSection>

            <LegalSection icon={Lock} title="Confidentiality" sectionNumber="25">
              <p>During the term of this Agreement and for a period of seven (7) years thereafter, both parties shall maintain in confidence and use only for the purpose for which it was disclosed any confidential information received from the other party. Confidential information shall not include information that: (i) is or becomes public through no fault of the receiving party; (ii) was disclosed by a third party without restriction; (iii) was already in the receiving party&rsquo;s possession; or (iv) was independently developed by the receiving party.</p>
            </LegalSection>

            <LegalSection icon={AlertOctagon} title="Limitation of Liability, Warranty & Exclusions" sectionNumber="26–28">
              <p><strong className="text-gray-300">Limitation of Liability:</strong> Service Provider&rsquo;s total liability under this Agreement shall not exceed the fees paid by Client during the twelve (12) months preceding the claim. This limitation applies to all causes of action in the aggregate.</p>
              <p><strong className="text-gray-300">Limitation of Warranty:</strong> Services are provided &ldquo;as is&rdquo; to the extent not otherwise specified in an applicable Schedule. Service Provider disclaims all warranties not expressly stated in this Agreement.</p>
            </LegalSection>

            <LegalSection icon={Gavel} title="General Provisions" sectionNumber="29–39">
              <p><strong className="text-gray-300">Intellectual Property (29):</strong> All pre-existing intellectual property remains the property of its respective owner. Work product created specifically for Client shall be assigned to Client upon full payment.</p>
              <p><strong className="text-gray-300">Independent Contractor (30):</strong> Service Provider is an independent contractor. Nothing in this Agreement creates an employment, partnership, or agency relationship between the parties.</p>
              <p><strong className="text-gray-300">Dispute Resolution (33):</strong> Any disputes arising under this Agreement shall be resolved through good faith negotiation, followed by mediation, and if necessary, binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in New York, NY.</p>
              <p><strong className="text-gray-300">Attorneys&rsquo; Fees (36):</strong> In any action to enforce this Agreement, the prevailing party shall be entitled to recover its reasonable attorneys&rsquo; fees and costs from the non-prevailing party.</p>
              <p><strong className="text-gray-300">Entire Agreement (38):</strong> This Agreement, together with all Schedules, constitutes the entire agreement between the parties and supersedes all prior agreements, understandings, and representations, whether written or oral.</p>
            </LegalSection>
          </div>

          {/* Questions CTA */}
          <div className="mt-12 rounded-2xl p-8 text-center" style={{ backgroundColor: `rgba(${GOLD_RGB},0.05)`, border: `1px solid rgba(${GOLD_RGB},0.15)` }}>
            <h2 className="text-xl font-bold text-white font-['Sora'] mb-2">Questions About This Agreement?</h2>
            <p className="text-gray-500 mb-4">Our team is happy to walk you through any section of this agreement.</p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <a href="mailto:support@sinbarconsultants.com" className="flex items-center gap-2 hover:text-white transition-colors" style={{ color: GOLD }}>
                <Mail className="w-4 h-4" /> support@sinbarconsultants.com
              </a>
              <span className="text-gray-700">·</span>
              <a href="tel:3477200367" className="flex items-center gap-2 hover:text-white transition-colors" style={{ color: GOLD }}>
                <Phone className="w-4 h-4" /> (347) 720-0367
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-600 text-center mt-8">
            This document is provided for informational purposes. The binding version is the signed copy between Sinbar Consultants LLC and the Client. &copy; 2026 Sinbar Consultants LLC. All rights reserved.
          </p>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/13472017076"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group"
        style={{
          backgroundColor: "#25D366",
          color: "white",
          boxShadow: "0 10px 25px -5px rgba(37, 211, 102, 0.4)"
        }}
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="font-bold text-sm">Chat with us</span>
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500" />
      </a>
    </div>
  );
}
