import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  CheckSquare,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle2,
  Clock,
  FileText,
  ImageIcon,
  Paperclip,
  Printer,
  Upload,
  AlertTriangle,
  Eye,
  Search,
  LogOut,
  X,
  RotateCcw,
  HardHat,
  Wrench,
  Shield,
  ZoomIn,
  Download,
  Plus,
  Pencil,
  Briefcase,
  Users,
  CircleDot,
  Save,
  Trash2,
  CalendarDays,
  UserCheck,
  BarChart3,
  Eye as EyeIcon,
  EyeOff,
  Globe,
  Type,
  AlignLeft,
  Hash,
  List,
  PenLine,
  MousePointer2,
  Square,
  Layers,
  GripVertical,
  Copy,
  ChevronUp,
  ChevronDown,
  Columns,
  Table,
  Layout,
  ToggleLeft,
  Calendar,
  Columns3,
} from "lucide-react";

import imgMiJackLogo from "@/imports/TabletLogin112/0758065b09caa1922ffaa90cb45af61cd56f3f89.png";
import imgCraneBg from "@/imports/TabletLogin112/a8e25246cbd5170e1c08802d1800fdf3d453e317.png";
import imgMicrosoftLogo from "@/imports/TabletLogin112/b413fa58018f84bf9393d355080ec7aec0b04a67.png";
import imgGoogleLogo from "@/imports/TabletLogin112/5f9849d48a93a090005402daafc8ef822895df44.png";
import svgPaths from "@/imports/TabletLogin112/svg-km0hk690a";

// ─── Auth ─────────────────────────────────────────────────────────────────────

interface Account {
  email: string;
  password: string;
  role: Role;
  name: string;
  title: string;
  initials: string;
}

const ACCOUNTS: Account[] = [
  { email: "worker@mi-jackvietnam.com", password: "123456", role: "worker", name: "Nguyen Van An", title: "Welding Operator", initials: "NV" },
  { email: "qc@mi-jackvietnam.com", password: "123456", role: "qc", name: "Le Thi Bich", title: "QC Engineer", initials: "LT" },
  { email: "pe@mi-jackvietnam.com", password: "123456", role: "pe", name: "Tran Quoc Huy", title: "Project Engineer", initials: "TH" },
  { email: "admin@mi-jackvietnam.com", password: "123456", role: "admin", name: "Nguyen Viet Hung", title: "Administrator", initials: "NH" },
];

// ─── Types ───────────────────────────────────────────────────────────────────

type Role = "worker" | "qc" | "pe" | "admin";

type Screen =
  | "worker-dashboard"
  | "worker-task-detail"
  | "qc-dashboard"
  | "qc-task-detail"
  | "qc-inspection"
  | "qc-form-list"
  | "qc-form-builder"
  | "pe-dashboard"
  | "pe-job-detail";

type TaskStatus =
  | "pending"
  | "in-progress"
  | "awaiting-qc"
  | "awaiting-rework"
  | "done";

type JobStatus = "unassigned" | "assigned" | "in-progress" | "awaiting-qc" | "done";

type Priority = "low" | "medium" | "high" | "urgent";

interface Task {
  id: string;
  taskNo: string;
  description: string;
  jobNo: string;
  productName: string;
  partSN: string;
  workshop: string;
  assignedTo: string;
  assignedQC: string;
  status: TaskStatus;
  estimation: number;
  startTime?: Date;
  dueDate: string;
  drawings: string[];
  attachments: string[];
}

interface Job {
  id: string;
  jobNo: string;
  projectNo: string;
  productName: string;
  partSN: string;
  workshop: string;
  description: string;
  priority: Priority;
  status: JobStatus;
  assignedWorker: string;
  assignedQC: string;
  estimation: number;
  dueDate: string;
  drawings: string[];
  notes: string;
  createdDate: string;
}

// ─── Form Builder Types ───────────────────────────────────────────────────────

type FieldType =
  | "textbox" | "textarea" | "checkbox" | "radio" | "passfail" | "select"
  | "number" | "datetime" | "file" | "signature" | "button"
  | "panel" | "columns" | "tab" | "table";

interface FieldOption { label: string; value: string; }

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  width?: "full" | "half" | "third";
  defaultValue?: string;
  rows?: number;
  options?: FieldOption[];
  multiple?: boolean;
  inline?: boolean;
  buttonLabel?: string;
  buttonStyle?: "primary" | "secondary" | "danger";
  dateType?: "date" | "time" | "datetime-local";
  panelTitle?: string;
  collapsible?: boolean;
  columnCount?: 2 | 3 | 4;
  tabs?: { label: string; id: string }[];
  tableHeaders?: string[];
  cells?: FormField[][][];
  showRowNumbers?: boolean;
  allowAddRow?: boolean;
  signatureHeight?: number;
}

type FormStatus = "draft" | "active" | "archived";

interface FormTemplate {
  id: string;
  formId: string;
  name: string;
  description: string;
  workshop: string;
  products: string[];
  status: FormStatus;
  fields: FormField[];
  createdDate: string;
  updatedDate: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const WORKERS = [
  "Nguyen Van An",
  "Tran Duc Manh",
  "Pham Quoc Hung",
  "Le Van Thanh",
  "Hoang Minh Tuan",
  "Bui Thi Lan",
];

const QC_ENGINEERS = [
  "Le Thi Bich",
  "Tran Minh Duc",
  "Nguyen Thi Hoa",
  "Pham Van Long",
];

const WORKSHOPS = [
  "Cutting & Bending",
  "Machining",
  "Welding",
  "Painting",
  "Assembly",
  "Packing",
];

const ALL_PRODUCTS = [
  "Rubber Tired Gantry Crane",
  "Rail Mounted Gantry Crane",
  "Portal Frame Structure",
  "Ship-to-Shore Crane",
  "Overhead Bridge Crane",
  "Jib Crane",
  "Bogie Wheel Assembly",
  "Spreader Bar",
  "Cable Drum",
  "Trolley Frame",
];

interface PaletteItem { type: FieldType; label: string; icon: React.ReactNode; }

const PALETTE_BASIC: PaletteItem[] = [
  { type: "textbox",   label: "Text Field",  icon: <Type size={14} /> },
  { type: "textarea",  label: "Text Area",   icon: <AlignLeft size={14} /> },
  { type: "number",    label: "Number",      icon: <Hash size={14} /> },
  { type: "select",    label: "Select",      icon: <List size={14} /> },
  { type: "radio",     label: "Radio",       icon: <CircleDot size={14} /> },
  { type: "passfail",  label: "Pass / Fail", icon: <CheckCircle2 size={14} /> },
  { type: "checkbox",  label: "Checkbox",    icon: <CheckSquare size={14} /> },
  { type: "datetime",  label: "Date / Time", icon: <Calendar size={14} /> },
  { type: "file",      label: "File Upload", icon: <Upload size={14} /> },
  { type: "signature", label: "Signature",   icon: <PenLine size={14} /> },
  { type: "button",    label: "Button",      icon: <MousePointer2 size={14} /> },
];

const PALETTE_LAYOUT: PaletteItem[] = [
  { type: "panel",   label: "Panel",   icon: <Square size={14} /> },
  { type: "columns", label: "Columns", icon: <Columns3 size={14} /> },
  { type: "tab",     label: "Tabs",    icon: <Layers size={14} /> },
  { type: "table",   label: "Table",   icon: <Table size={14} /> },
];

let _formSeq = 4;
function generateFormId() {
  _formSeq += 1;
  return `FORM-QC-${String(_formSeq).padStart(4, "0")}`;
}

function createField(type: FieldType): FormField {
  const base: FormField = { id: `f-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, type, label: fieldTypeLabel(type), width: "full" };
  if (type === "textarea")  return { ...base, rows: 3 };
  if (type === "select")    return { ...base, options: [{ label: "Option 1", value: "opt1" }, { label: "Option 2", value: "opt2" }] };
  if (type === "radio")     return { ...base, options: [{ label: "Option 1", value: "opt1" }, { label: "Option 2", value: "opt2" }] };
  if (type === "passfail")  return { ...base, options: [{ label: "Pass", value: "pass" }, { label: "Fail", value: "fail" }] };
  if (type === "checkbox")  return { ...base, options: [{ label: "Option 1", value: "opt1" }] };
  if (type === "button")    return { ...base, buttonLabel: "Submit", buttonStyle: "primary" };
  if (type === "panel")     return { ...base, panelTitle: "Panel", collapsible: false };
  if (type === "columns")   return { ...base, columnCount: 2 };
  if (type === "tab")       return { ...base, tabs: [{ label: "Tab 1", id: "t1" }, { label: "Tab 2", id: "t2" }] };
  if (type === "table") {
    const headers = ["Column 1", "Column 2", "Column 3"];
    return { ...base, tableHeaders: headers, allowAddRow: true, cells: [headers.map(() => [] as FormField[])] };
  }
  if (type === "datetime")  return { ...base, dateType: "date" };
  if (type === "signature") return { ...base, signatureHeight: 120 };
  return base;
}

function fieldTypeLabel(type: FieldType): string {
  const map: Record<FieldType, string> = {
    textbox: "Text Field", textarea: "Text Area", checkbox: "Checkbox",
    radio: "Radio Group", passfail: "Pass / Fail", select: "Select", number: "Number",
    datetime: "Date / Time", file: "File Upload", signature: "Signature",
    button: "Button", panel: "Panel", columns: "Columns", tab: "Tabs", table: "Table",
  };
  return map[type] ?? type;
}

function fieldTypeBadgeColor(type: FieldType): string {
  if (["textbox","textarea","number"].includes(type)) return "bg-blue-100 text-blue-700";
  if (["select","radio","checkbox","passfail"].includes(type))   return "bg-purple-100 text-purple-700";
  if (["datetime","file","signature"].includes(type)) return "bg-amber-100 text-amber-700";
  if (["button"].includes(type))                      return "bg-green-100 text-green-700";
  return "bg-slate-100 text-slate-600";
}

const INITIAL_FORM_TEMPLATES: FormTemplate[] = [
  {
    id: "ft1", formId: "FORM-QC-0001", name: "Welding Visual Inspection",
    description: "Standard visual inspection checklist for welded joints per AWS D1.1",
    workshop: "Welding", products: ["Rubber Tired Gantry Crane", "Portal Frame Structure"],
    status: "active",
    fields: [
      createField("textbox"),
      { ...createField("select"), label: "Weld Type", options: [{ label: "Butt Weld", value: "butt" }, { label: "Fillet Weld", value: "fillet" }, { label: "Groove Weld", value: "groove" }] },
      { ...createField("radio"), label: "Pass / Fail", options: [{ label: "Pass", value: "pass" }, { label: "Fail", value: "fail" }] },
      { ...createField("signature"), label: "QC Signature" },
    ],
    createdDate: "2024-10-15", updatedDate: "2024-11-01",
  },
  {
    id: "ft2", formId: "FORM-QC-0002", name: "Dimensional Check Report",
    description: "Dimensional inspection form for machined components",
    workshop: "Machining", products: ["Bogie Wheel Assembly", "Trolley Frame"],
    status: "active",
    fields: [
      createField("textbox"),
      createField("number"),
      { ...createField("textarea"), label: "Remarks" },
    ],
    createdDate: "2024-10-20", updatedDate: "2024-10-20",
  },
  {
    id: "ft3", formId: "FORM-QC-0003", name: "Paint Thickness Inspection",
    description: "Dry film thickness measurement log for coating inspection",
    workshop: "Painting", products: ["Portal Frame Structure", "Ship-to-Shore Crane"],
    status: "draft",
    fields: [],
    createdDate: "2024-11-05", updatedDate: "2024-11-05",
  },
];

const INITIAL_JOBS: Job[] = [
  {
    id: "j1",
    jobNo: "JOB-2024-0087",
    projectNo: "PRJ-2024-012",
    productName: "Rubber Tired Gantry Crane",
    partSN: "RTG-2024-001-MF",
    workshop: "Welding",
    description: "Fabricate and weld main frame structure for RTG crane unit #1. Material: A572 Gr.50 steel plate.",
    priority: "high",
    status: "in-progress",
    assignedWorker: "Nguyen Van An",
    assignedQC: "Le Thi Bich",
    estimation: 480,
    dueDate: "2024-11-20",
    drawings: ["DWG-MF-001.pdf", "DWG-MF-002.pdf", "WPS-RTG-001.pdf"],
    notes: "Critical path item — cannot delay. Coordinate with machining team for bogie wheel delivery.",
    createdDate: "2024-11-01",
  },
  {
    id: "j2",
    jobNo: "JOB-2024-0088",
    projectNo: "PRJ-2024-013",
    productName: "Portal Frame Structure",
    partSN: "PFS-2024-003-SM",
    workshop: "Painting",
    description: "Apply primer and topcoat paint system to portal frame structural members per spec PS-2024-003.",
    priority: "medium",
    status: "in-progress",
    assignedWorker: "Nguyen Van An",
    assignedQC: "Le Thi Bich",
    estimation: 240,
    dueDate: "2024-11-18",
    drawings: ["DWG-SM-001.pdf", "PAINT-SPEC-003.pdf"],
    notes: "",
    createdDate: "2024-11-03",
  },
  {
    id: "j3",
    jobNo: "JOB-2024-0089",
    projectNo: "PRJ-2024-012",
    productName: "Rubber Tired Gantry Crane",
    partSN: "RTG-2024-001-BW",
    workshop: "Machining",
    description: "Machine bogie wheel axles to tolerance ±0.05mm as per drawing DWG-BW-001.",
    priority: "high",
    status: "assigned",
    assignedWorker: "Tran Duc Manh",
    assignedQC: "Tran Minh Duc",
    estimation: 360,
    dueDate: "2024-11-22",
    drawings: ["DWG-BW-001.pdf"],
    notes: "Use CNC lathe #2. Cross-check with QC before each batch.",
    createdDate: "2024-11-05",
  },
  {
    id: "j4",
    jobNo: "JOB-2024-0090",
    projectNo: "PRJ-2024-015",
    productName: "Hydraulic Cylinder Assembly",
    partSN: "HCA-2024-001-CY",
    workshop: "Assembly",
    description: "Assemble hydraulic cylinder components, install seals and test for leaks at 250 bar.",
    priority: "urgent",
    status: "unassigned",
    assignedWorker: "",
    assignedQC: "",
    estimation: 180,
    dueDate: "2024-11-16",
    drawings: ["DWG-HCA-001.pdf", "DWG-HCA-002.pdf"],
    notes: "Customer delivery deadline — URGENT. Requires certified hydraulic technician.",
    createdDate: "2024-11-08",
  },
  {
    id: "j5",
    jobNo: "JOB-2024-0091",
    projectNo: "PRJ-2024-014",
    productName: "Steel Walkway Platform",
    partSN: "SWP-2024-004-GR",
    workshop: "Cutting & Bending",
    description: "Cut and bend grating panels for walkway platform. Total 24 pieces as per layout drawing.",
    priority: "low",
    status: "unassigned",
    assignedWorker: "",
    assignedQC: "",
    estimation: 300,
    dueDate: "2024-11-28",
    drawings: ["DWG-SWP-004.pdf"],
    notes: "",
    createdDate: "2024-11-09",
  },
  {
    id: "j6",
    jobNo: "JOB-2024-0092",
    projectNo: "PRJ-2024-016",
    productName: "Oil Tank Assembly",
    partSN: "OTA-2024-002-WS",
    workshop: "Welding",
    description: "Weld oil tank shell and end caps. Perform pressure test at 1.5x working pressure.",
    priority: "high",
    status: "awaiting-qc",
    assignedWorker: "Pham Quoc Hung",
    assignedQC: "Le Thi Bich",
    estimation: 420,
    dueDate: "2024-11-15",
    drawings: ["DWG-OT-001.pdf", "DWG-OT-002.pdf", "WPS-OTA-002.pdf"],
    notes: "Pressure test to be performed in Bay 3 with QC present.",
    createdDate: "2024-11-02",
  },
  {
    id: "j7",
    jobNo: "JOB-2024-0093",
    projectNo: "PRJ-2024-011",
    productName: "Conveyor Frame Section",
    partSN: "CFS-2024-005-FR",
    workshop: "Welding",
    description: "Fabricate conveyor frame sections C1 through C8. Weld per approved WPS.",
    priority: "medium",
    status: "done",
    assignedWorker: "Le Van Thanh",
    assignedQC: "Nguyen Thi Hoa",
    estimation: 560,
    dueDate: "2024-11-10",
    drawings: ["DWG-CFS-005-A.pdf", "DWG-CFS-005-B.pdf"],
    notes: "",
    createdDate: "2024-10-28",
  },
];

const TASKS: Task[] = [
  {
    id: "1",
    taskNo: "TSK-2024-001",
    description: "Cut & Bend main frame beams to specified dimensions",
    jobNo: "JOB-2024-0087",
    productName: "Rubber Tired Gantry Crane",
    partSN: "RTG-2024-001-MF",
    workshop: "Cutting & Bending",
    assignedTo: "Nguyen Van An",
    assignedQC: "Le Thi Bich",
    status: "in-progress",
    estimation: 240,
    startTime: new Date(Date.now() - 45 * 60 * 1000),
    dueDate: "2024-11-15",
    drawings: ["DWG-MF-001.pdf", "DWG-MF-002.pdf"],
    attachments: [],
  },
  {
    id: "2",
    taskNo: "TSK-2024-002",
    description: "Machine bogie wheel axle to tolerance ±0.05mm",
    jobNo: "JOB-2024-0087",
    productName: "Rubber Tired Gantry Crane",
    partSN: "RTG-2024-001-BW",
    workshop: "Machining",
    assignedTo: "Nguyen Van An",
    assignedQC: "Le Thi Bich",
    status: "awaiting-rework",
    estimation: 180,
    dueDate: "2024-11-16",
    drawings: ["DWG-BW-001.pdf"],
    attachments: ["photo_result_1.jpg"],
  },
  {
    id: "3",
    taskNo: "TSK-2024-003",
    description: "Weld spreader beam assembly per WPS-RTG-003",
    jobNo: "JOB-2024-0092",
    productName: "Oil Tank Assembly",
    partSN: "OTA-2024-002-SB",
    workshop: "Welding",
    assignedTo: "Nguyen Van An",
    assignedQC: "Tran Minh Duc",
    status: "pending",
    estimation: 300,
    dueDate: "2024-11-18",
    drawings: ["DWG-SB-001.pdf", "DWG-SB-002.pdf"],
    attachments: [],
  },
  {
    id: "4",
    taskNo: "TSK-2024-004",
    description: "Apply anti-corrosion primer coat to structural members",
    jobNo: "JOB-2024-0088",
    productName: "Portal Frame Structure",
    partSN: "PFS-2024-003-SM",
    workshop: "Painting",
    assignedTo: "Nguyen Van An",
    assignedQC: "Le Thi Bich",
    status: "in-progress",
    estimation: 120,
    startTime: new Date(Date.now() - 30 * 60 * 1000),
    dueDate: "2024-11-14",
    drawings: ["DWG-SM-001.pdf"],
    attachments: [],
  },
];

const QC_TASKS: Task[] = [
  {
    id: "5",
    taskNo: "TSK-2024-005",
    description: "Visual inspection of oil tank weld seams",
    jobNo: "JOB-2024-0092",
    productName: "Oil Tank Assembly",
    partSN: "OTA-2024-002-WS",
    workshop: "Welding",
    assignedTo: "Pham Quoc Hung",
    assignedQC: "Le Thi Bich",
    status: "awaiting-qc",
    estimation: 60,
    dueDate: "2024-11-15",
    drawings: ["DWG-OT-001.pdf", "DWG-OT-002.pdf"],
    attachments: ["weld_photo_1.jpg", "weld_photo_2.jpg", "weld_report.pdf"],
  },
  {
    id: "6",
    taskNo: "TSK-2024-006",
    description: "Dimensional check of machined bogie frame",
    jobNo: "JOB-2024-0087",
    productName: "Rubber Tired Gantry Crane",
    partSN: "RTG-2024-001-BF",
    workshop: "Machining",
    assignedTo: "Tran Duc Manh",
    assignedQC: "Le Thi Bich",
    status: "awaiting-qc",
    estimation: 45,
    dueDate: "2024-11-15",
    drawings: ["DWG-BF-001.pdf"],
    attachments: ["measure_photo.jpg"],
  },
  {
    id: "7",
    taskNo: "TSK-2024-007",
    description: "Paint adhesion and thickness inspection",
    jobNo: "JOB-2024-0088",
    productName: "Portal Frame Structure",
    partSN: "PFS-2024-003-SM",
    workshop: "Painting",
    assignedTo: "Nguyen Van An",
    assignedQC: "Le Thi Bich",
    status: "pending",
    estimation: 30,
    dueDate: "2024-11-17",
    drawings: ["DWG-SM-001.pdf"],
    attachments: [],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function useCountdown(startTime?: Date, estimation?: number) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);
  const remaining = estimation ? estimation * 60 - elapsed : 0;
  const isOvertime = remaining < 0;
  const abs = Math.abs(remaining);
  const h = Math.floor(abs / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = abs % 60;
  const label = `${h > 0 ? `${h}h ` : ""}${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
  const elapsedH = Math.floor(elapsed / 3600);
  const elapsedM = Math.floor((elapsed % 3600) / 60);
  const elapsedS = elapsed % 60;
  const elapsedLabel = `${elapsedH > 0 ? `${elapsedH}h ` : ""}${String(elapsedM).padStart(2, "0")}m ${String(elapsedS).padStart(2, "0")}s`;
  const pct = estimation ? Math.min((elapsed / (estimation * 60)) * 100, 100) : 0;
  return { label, elapsedLabel, isOvertime, pct };
}

function statusColor(status: TaskStatus) {
  switch (status) {
    case "in-progress":
      return { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500", label: "In Progress" };
    case "awaiting-qc":
      return { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500", label: "Awaiting QC" };
    case "awaiting-rework":
      return { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500", label: "Awaiting Rework" };
    case "done":
      return { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500", label: "Done" };
    default:
      return { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400", label: "Pending" };
  }
}

function jobStatusColor(status: JobStatus) {
  switch (status) {
    case "unassigned":
      return { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400", label: "Unassigned" };
    case "assigned":
      return { bg: "bg-purple-100", text: "text-purple-700", dot: "bg-purple-500", label: "Assigned" };
    case "in-progress":
      return { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500", label: "In Progress" };
    case "awaiting-qc":
      return { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500", label: "Awaiting QC" };
    case "done":
      return { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500", label: "Done" };
  }
}

function priorityColor(p: Priority) {
  switch (p) {
    case "urgent": return { bg: "bg-red-100", text: "text-red-700", label: "Urgent" };
    case "high": return { bg: "bg-orange-100", text: "text-orange-700", label: "High" };
    case "medium": return { bg: "bg-yellow-100", text: "text-yellow-700", label: "Medium" };
    case "low": return { bg: "bg-slate-100", text: "text-slate-600", label: "Low" };
  }
}

function StatusBadge({ status }: { status: TaskStatus }) {
  const c = statusColor(status);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`size-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

function JobStatusBadge({ status }: { status: JobStatus }) {
  const c = jobStatusColor(status);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`size-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const c = priorityColor(priority);
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}

function workshopIcon(ws: string) {
  if (ws.includes("Cut")) return <Wrench size={14} />;
  if (ws.includes("Mach")) return <Settings size={14} />;
  if (ws.includes("Weld")) return <HardHat size={14} />;
  if (ws.includes("Paint")) return <ImageIcon size={14} />;
  if (ws.includes("Assem")) return <Briefcase size={14} />;
  if (ws.includes("QC") || ws.includes("Inspect")) return <Shield size={14} />;
  return <ClipboardList size={14} />;
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function FloatingInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  rightElement,
  hasError,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon: React.ReactNode;
  rightElement?: React.ReactNode;
  hasError?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const lifted = focused || filled;

  return (
    <div className="relative">
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-xl border bg-white transition-colors ${
          hasError
            ? "border-red-400"
            : focused
            ? "border-[#0d2b5e]"
            : "border-[#e1e5ed]"
        }`}
        style={{ height: 48 }}
      >
        <span className="shrink-0 text-[#5e6573]">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={lifted ? placeholder : ""}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 text-sm text-[#0f0f0f] outline-none bg-transparent min-w-0"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        />
        {rightElement && <span className="shrink-0">{rightElement}</span>}
      </div>
      {/* Floating label */}
      <span
        className="absolute left-9 pointer-events-none transition-all"
        style={{
          top: lifted ? -9 : 14,
          fontSize: lifted ? 12 : 14,
          color: hasError ? "#ef4444" : lifted ? "#0d2b5e" : "#5e6573",
          fontFamily: "'Manrope', sans-serif",
          background: lifted ? "white" : "transparent",
          paddingLeft: lifted ? 3 : 0,
          paddingRight: lifted ? 3 : 0,
          lineHeight: "1.4",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: (account: Account) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDemoPanel, setShowDemoPanel] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const account = ACCOUNTS.find(
        (a) => a.email.toLowerCase() === email.toLowerCase().trim() && a.password === password
      );
      if (account) {
        onLogin(account);
      } else {
        setError("Invalid email or password. Please try again.");
      }
      setLoading(false);
    }, 600);
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-white" style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* ── Header ── */}
      <header className="bg-white shrink-0 flex items-center justify-between px-10 border-b border-[#e1e5ed]" style={{ height: 80 }}>
        <img src={imgMiJackLogo} alt="MI-Jack Vietnam" className="h-11 object-contain pointer-events-none" />
        {/* Language selector */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer select-none"
          style={{
            backgroundImage: "linear-gradient(151deg, rgba(255,255,255,0.9) 18%, rgba(255,255,255,0.5) 49%, rgba(255,255,255,0.9) 82%)",
            border: "1px solid #e1e5ed",
          }}
        >
          <Globe size={18} className="text-[#5e6573]" />
          <span className="text-sm font-semibold text-[#5e6573]">EN</span>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left panel — crane image */}
        <div className="hidden lg:flex relative overflow-hidden" style={{ flex: "0 0 50%" }}>
          <img
            src={imgCraneBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.50)" }} />
          {/* PRODUCTION FLOW title */}
          <div className="relative flex items-center justify-center w-full h-full">
            <h1
              className="text-white font-bold text-center select-none"
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                fontFamily: "'Sofia Sans Extra Condensed', 'Manrope', sans-serif",
                letterSpacing: "0.01em",
                lineHeight: 1.1,
              }}
            >
              PRODUCTION FLOW
            </h1>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="flex-1 flex items-center justify-center px-6 py-8 bg-white overflow-auto">
          <div className="w-full" style={{ maxWidth: 480 }}>

            {/* Glassmorphism card */}
            <div
              className="relative rounded-[20px] px-5 py-8"
              style={{
                backgroundImage: "linear-gradient(112deg, rgba(255,255,255,0.9) 17%, rgba(255,255,255,0.5) 49%, rgba(255,255,255,0.9) 83%)",
                boxShadow: "0px 4px 32px 0px rgba(89,93,176,0.08)",
                border: "1px solid rgba(255,255,255,0.7)",
              }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Fields */}
                <div className="flex flex-col gap-4" style={{ width: 380, maxWidth: "100%", margin: "0 auto" }}>
                  <FloatingInput
                    label="Username"
                    type="email"
                    value={email}
                    onChange={(v) => { setEmail(v); setError(""); }}
                    placeholder="jane.doe@mi-jackvietnam.com"
                    hasError={!!error}
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path clipRule="evenodd" d={svgPaths.pe061c80} fill="#0F0F0F" fillRule="evenodd" transform="scale(1.23) translate(-0.4, -0.3)" />
                      </svg>
                    }
                  />
                  <FloatingInput
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(v) => { setPassword(v); setError(""); }}
                    placeholder="••••••••"
                    hasError={!!error}
                    icon={
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path clipRule="evenodd" d={svgPaths.p982400} fill="#0F0F0F" fillRule="evenodd" transform="scale(1.23) translate(-0.4, -0.25)" />
                      </svg>
                    }
                    rightElement={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-[#5e6573] hover:text-[#0d2b5e] transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <EyeIcon size={18} />}
                      </button>
                    }
                  />
                </div>

                {/* Remember me + Forgot */}
                <div className="flex items-center justify-between" style={{ width: 380, maxWidth: "100%", margin: "0 auto" }}>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <button
                      type="button"
                      onClick={() => setRememberMe(!rememberMe)}
                      className="relative shrink-0 size-5"
                    >
                      <svg viewBox="0 0 20 20" fill="none" className="size-full">
                        <path d={svgPaths.p3d570e80} fill={rememberMe ? "#0d2b5e" : "white"} />
                        <path d={svgPaths.p3d570e80} stroke={rememberMe ? "#0d2b5e" : "#c1c7d0"} strokeWidth="1.5" fill="none" />
                        {rememberMe && (
                          <path d="M15 7L8.32955 13L5 10" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        )}
                      </svg>
                    </button>
                    <span className="text-sm text-[#535965]">Remember me</span>
                  </label>
                  <button type="button" className="text-sm font-semibold text-[#0d2b5e] hover:underline">
                    Forgot Password?
                  </button>
                </div>

                {/* Error */}
                {error && (
                  <div
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                    style={{ background: "#fef2f2", border: "1px solid #fecaca", width: 380, maxWidth: "100%", margin: "0 auto" }}
                  >
                    <AlertTriangle size={15} className="text-red-500 shrink-0" />
                    <p className="text-xs font-medium text-red-700">{error}</p>
                  </div>
                )}

                {/* Login button */}
                <div style={{ width: 380, maxWidth: "100%", margin: "0 auto" }}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 font-semibold text-base text-white rounded-xl transition-opacity"
                    style={{
                      height: 46,
                      background: loading ? "#5a8fc4" : "#0d2b5e",
                    }}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin size-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Signing in...
                      </>
                    ) : "Login"}
                  </button>
                </div>

                {/* SSO divider */}
                <div className="flex items-center justify-center" style={{ width: 380, maxWidth: "100%", margin: "0 auto" }}>
                  <p className="text-sm text-[#535965]">Or continue with</p>
                </div>

                {/* SSO buttons */}
                <div className="flex flex-col gap-3" style={{ width: 380, maxWidth: "100%", margin: "0 auto" }}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-white transition-colors hover:bg-slate-50"
                    style={{ height: 48, border: "1px solid #535965" }}
                  >
                    <img src={imgMicrosoftLogo} alt="Microsoft" className="size-7 object-contain pointer-events-none" />
                    <span className="text-base font-semibold text-[#535965]">Microsoft</span>
                  </button>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-white transition-colors hover:bg-slate-50"
                    style={{ height: 48, border: "1px solid #535965" }}
                  >
                    <img src={imgGoogleLogo} alt="Google" className="size-7 object-contain pointer-events-none" />
                    <span className="text-base font-semibold text-[#535965]">Google</span>
                  </button>
                </div>

              </form>

              {/* Demo accounts toggle */}
              <div style={{ width: 380, maxWidth: "100%", margin: "20px auto 0" }}>
                <button
                  type="button"
                  onClick={() => setShowDemoPanel(!showDemoPanel)}
                  className="w-full text-xs text-[#5e6573] hover:text-[#0d2b5e] transition-colors underline underline-offset-2"
                >
                  {showDemoPanel ? "Hide demo accounts" : "Show demo accounts"}
                </button>
                {showDemoPanel && (
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {ACCOUNTS.map((a) => (
                      <button
                        key={a.email}
                        type="button"
                        onClick={() => { setEmail(a.email); setPassword(a.password); setError(""); setShowDemoPanel(false); }}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors hover:bg-blue-50"
                        style={{ border: "1px solid #e1e5ed", background: "white" }}
                      >
                        <div
                          className="size-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                          style={{ background: "#0d2b5e" }}
                        >
                          {a.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold text-[#0f0f0f]">
                            {a.email.startsWith("admin") ? "Admin" : a.role.toUpperCase()}
                          </p>
                          <p className="text-[10px] text-[#5e6573] truncate">{a.email.split("@")[0]}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-white shrink-0 flex items-center justify-center gap-8 border-t border-[#e1e5ed]" style={{ height: 60 }}>
        {[
          {
            label: "User guide",
            icon: (
              <svg width="14" height="14" viewBox="0 0 13.875 16.125" fill="none">
                <path clipRule="evenodd" d={svgPaths.pc34a600} fill="#0d2b5e" fillRule="evenodd" />
              </svg>
            ),
          },
          {
            label: "FAQs",
            icon: (
              <svg width="14" height="14" viewBox="0 0 16.125 16.125" fill="none">
                <path clipRule="evenodd" d={svgPaths.p334ea100} fill="#0d2b5e" fillRule="evenodd" />
              </svg>
            ),
          },
          {
            label: "Contact",
            icon: (
              <svg width="14" height="14" viewBox="0 0 14.65 16.125" fill="none">
                <path d={svgPaths.p34d0ef80} fill="#0d2b5e" />
              </svg>
            ),
          },
          {
            label: "T&C",
            icon: (
              <svg width="14" height="14" viewBox="0 0 13.8875 16.125" fill="none">
                <path clipRule="evenodd" d={svgPaths.pc34a600} fill="#0d2b5e" fillRule="evenodd" />
              </svg>
            ),
          },
        ].map((link) => (
          <button
            key={link.label}
            type="button"
            className="flex items-center gap-1.5 hover:underline"
          >
            {link.icon}
            <span className="text-sm text-[#0d2b5e]">{link.label}</span>
          </button>
        ))}
      </footer>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface SidebarProps {
  account: Account;
  screen: Screen;
  onNavigate: (s: Screen) => void;
  onLogout: () => void;
}

function Sidebar({ account, screen, onNavigate, onLogout }: SidebarProps) {
  const role = account.role;

  const roleChip = {
    worker: { label: "Worker", color: "bg-blue-500/20 text-blue-300" },
    qc: { label: "QC Engineer", color: "bg-amber-500/20 text-amber-300" },
    pe: { label: "Project Engineer", color: "bg-purple-500/20 text-purple-300" },
    admin: { label: "Administrator", color: "bg-green-500/20 text-green-300" },
  }[role] ?? { label: role, color: "bg-white/10 text-white/60" };

  return (
    <aside className="flex flex-col h-screen w-60 shrink-0 text-white" style={{ background: "#0d2b5e" }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="flex items-center justify-center size-9 rounded-lg bg-blue-500">
          <HardHat size={20} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-sm leading-tight text-white">Production</p>
          <p className="font-bold text-sm leading-tight text-blue-300">Flow</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {/* Worker section */}
        {(role === "worker" || role === "admin") && (
          <>
            {role === "admin" && (
              <div className="pt-2 pb-1 px-3">
                <p className="text-[9px] font-bold text-blue-300/70 uppercase tracking-widest">Worker</p>
              </div>
            )}
            <NavItem icon={<LayoutDashboard size={16} />} label="Dashboard" active={screen === "worker-dashboard"} onClick={() => onNavigate("worker-dashboard")} />
            <NavItem icon={<ClipboardList size={16} />} label="My Tasks" active={screen === "worker-task-detail"} onClick={() => onNavigate("worker-task-detail")} />
          </>
        )}

        {/* QC section */}
        {(role === "qc" || role === "admin") && (
          <>
            {role === "admin" && (
              <div className="pt-3 pb-1 px-3">
                <p className="text-[9px] font-bold text-blue-300/70 uppercase tracking-widest">QC Engineer</p>
              </div>
            )}
            <NavItem icon={<LayoutDashboard size={16} />} label={role === "admin" ? "QC Dashboard" : "Dashboard"} active={screen === "qc-dashboard"} onClick={() => onNavigate("qc-dashboard")} />
            <NavItem icon={<CheckSquare size={16} />} label="Inspections" active={screen === "qc-task-detail" || screen === "qc-inspection"} onClick={() => onNavigate("qc-task-detail")} />
            <div className="pt-2 pb-1 px-3">
              <p className="text-[9px] font-bold text-blue-300/70 uppercase tracking-widest">Template Management</p>
            </div>
            <NavItem icon={<Layout size={16} />} label="Form Builder" active={screen === "qc-form-list" || screen === "qc-form-builder"} onClick={() => onNavigate("qc-form-list")} />
          </>
        )}

        {/* PE section */}
        {(role === "pe" || role === "admin") && (
          <>
            {role === "admin" && (
              <div className="pt-3 pb-1 px-3">
                <p className="text-[9px] font-bold text-blue-300/70 uppercase tracking-widest">Project Engineer</p>
              </div>
            )}
            <NavItem icon={<LayoutDashboard size={16} />} label={role === "admin" ? "PE Dashboard" : "Dashboard"} active={screen === "pe-dashboard"} onClick={() => onNavigate("pe-dashboard")} />
            <NavItem icon={<Briefcase size={16} />} label="Jobs" active={screen === "pe-job-detail"} onClick={() => onNavigate("pe-dashboard")} />
          </>
        )}

        <div className="pt-3 pb-1 px-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">System</p>
        </div>
        <NavItem icon={<Settings size={16} />} label="Settings" active={false} onClick={() => {}} />
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0" style={{ background: "#1565c0" }}>
            {account.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{account.name}</p>
            <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded mt-0.5 ${roleChip.color}`}>
              {roleChip.label}
            </span>
          </div>
          <button onClick={onLogout} title="Sign out" className="text-white/40 hover:text-white/70 transition-colors">
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
        active ? "bg-blue-600 text-white shadow" : "text-white/60 hover:bg-white/8 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────

function TopBar({ title, subtitle, onPrint }: { title: string; subtitle?: string; onPrint?: () => void }) {
  return (
    <div className="flex items-center justify-between px-7 py-4 bg-white border-b border-border shrink-0">
      <div>
        <h1 className="text-lg font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {onPrint && (
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
          >
            <Printer size={15} />
            Print
          </button>
        )}
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell size={18} className="text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
        </button>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, icon, color, sublabel }: { label: string; value: number; icon: React.ReactNode; color: string; sublabel?: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-border flex items-center gap-4">
      <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{label}</p>
        {sublabel && <p className="text-[11px] text-muted-foreground/70">{sublabel}</p>}
      </div>
    </div>
  );
}

// ─── Task Row ─────────────────────────────────────────────────────────────────

function TaskRow({ task, onClick }: { task: Task; onClick: () => void }) {
  return (
    <tr
      onClick={onClick}
      className="border-b border-border last:border-0 hover:bg-blue-50/50 cursor-pointer transition-colors"
    >
      <td className="py-3 px-4">
        <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{task.taskNo}</span>
      </td>
      <td className="py-3 px-4">
        <p className="text-sm font-semibold text-foreground line-clamp-1">{task.description}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{task.jobNo}</p>
      </td>
      <td className="py-3 px-4">
        <p className="text-sm text-foreground line-clamp-1">{task.productName}</p>
        <p className="text-xs font-mono text-muted-foreground">{task.partSN}</p>
      </td>
      <td className="py-3 px-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
          {workshopIcon(task.workshop)}
          {task.workshop}
        </span>
      </td>
      <td className="py-3 px-4">
        <StatusBadge status={task.status} />
      </td>
      <td className="py-3 px-4">
        <p className="text-xs text-muted-foreground">{task.dueDate}</p>
      </td>
      <td className="py-3 px-4">
        <button className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors">
          <Eye size={15} />
        </button>
      </td>
    </tr>
  );
}

// ─── Documents Panel ──────────────────────────────────────────────────────────

function DocumentsPanel({ task }: { task: Task }) {
  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
        <FileText size={15} className="text-blue-600" />
        <h3 className="font-semibold text-sm text-foreground">Documents & References</h3>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Job Traveler</p>
          <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:border-blue-300 hover:bg-blue-50 transition-all group">
            <div className="size-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
              <FileText size={16} className="text-red-600" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-medium text-foreground">JT-{task.jobNo}.pdf</p>
              <p className="text-xs text-muted-foreground">Job Traveler — {task.workshop}</p>
            </div>
            <Download size={14} className="text-muted-foreground group-hover:text-blue-600 transition-colors" />
          </button>
        </div>

        {task.drawings.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Engineering Drawings</p>
            <div className="space-y-2">
              {task.drawings.map((d) => (
                <button key={d} className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:border-blue-300 hover:bg-blue-50 transition-all group">
                  <div className="size-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <ZoomIn size={16} className="text-blue-600" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{d}</p>
                    <p className="text-xs text-muted-foreground">Engineering Drawing</p>
                  </div>
                  <Download size={14} className="text-muted-foreground group-hover:text-blue-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {task.attachments.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Worker Attachments</p>
            <div className="space-y-2">
              {task.attachments.map((a) => (
                <button key={a} className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:border-amber-300 hover:bg-amber-50 transition-all group">
                  <div className="size-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                    <Paperclip size={16} className="text-amber-600" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{a}</p>
                    <p className="text-xs text-muted-foreground">Attached by worker</p>
                  </div>
                  <Download size={14} className="text-muted-foreground group-hover:text-amber-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Screen: Worker Dashboard ─────────────────────────────────────────────────

function WorkerDashboard({ onSelectTask }: { onSelectTask: (t: Task) => void }) {
  const myTasks = TASKS;
  const inProgress = myTasks.filter((t) => t.status === "in-progress");
  const rework = myTasks.filter((t) => t.status === "awaiting-rework");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | TaskStatus>("all");

  const filtered = myTasks.filter((t) => {
    const matchSearch =
      search === "" ||
      t.taskNo.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.jobNo.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || t.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex-1 overflow-auto">
      <TopBar title="Worker Dashboard" subtitle="Tuesday, November 12, 2024" />
      <div className="px-7 py-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Total Assigned Tasks" value={myTasks.length} icon={<ClipboardList size={22} className="text-slate-600" />} color="bg-slate-100" />
          <StatCard label="In Progress" value={inProgress.length} icon={<Play size={22} className="text-blue-600" />} color="bg-blue-100" />
          <StatCard label="Awaiting Rework" value={rework.length} icon={<RotateCcw size={22} className="text-red-600" />} color="bg-red-100" />
          <StatCard label="Completed Today" value={0} icon={<CheckCircle2 size={22} className="text-green-600" />} color="bg-green-100" />
        </div>

        {inProgress.length > 0 && (
          <div className="bg-blue-600 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-white/20 flex items-center justify-center">
                <Play size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Active: {inProgress[0].taskNo}</p>
                <p className="text-blue-200 text-xs mt-0.5 line-clamp-1">{inProgress[0].description}</p>
              </div>
            </div>
            <button
              onClick={() => onSelectTask(inProgress[0])}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-blue-700 font-semibold text-sm hover:bg-blue-50 transition-colors"
            >
              View Task <ChevronRight size={14} />
            </button>
          </div>
        )}

        {rework.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle size={20} className="text-red-600 shrink-0" />
              <div>
                <p className="text-red-700 font-semibold text-sm">{rework.length} task(s) require rework</p>
                <p className="text-red-500 text-xs">QC rejected — review feedback and redo the task</p>
              </div>
            </div>
            <button
              onClick={() => onSelectTask(rework[0])}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg text-white font-semibold text-sm hover:bg-red-700 transition-colors"
            >
              View <ChevronRight size={14} />
            </button>
          </div>
        )}

        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-4">
            <h2 className="font-bold text-base text-foreground">My Tasks</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tasks..."
                  className="pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-muted/40 focus:outline-none focus:border-blue-400 w-56"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as "all" | TaskStatus)}
                className="text-sm border border-border rounded-lg px-3 py-2 bg-muted/40 focus:outline-none focus:border-blue-400 text-foreground"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="awaiting-rework">Awaiting Rework</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/40">
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Task No.</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Description</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Product / Part</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Workshop</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Status</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Due Date</th>
                  <th className="py-2.5 px-4" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((task) => (
                  <TaskRow key={task.id} task={task} onClick={() => onSelectTask(task)} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Worker Task Detail ───────────────────────────────────────────────

function WorkerTaskDetail({ task, onBack }: { task: Task; onBack: () => void }) {
  const [currentTask, setCurrentTask] = useState<Task>(task);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const { label, elapsedLabel, isOvertime, pct } = useCountdown(currentTask.startTime, currentTask.estimation);

  function handleStart() {
    setCurrentTask({ ...currentTask, status: "in-progress", startTime: new Date() });
  }

  function handleDone() {
    setShowUpload(true);
  }

  function handleSubmitDone() {
    setCurrentTask({ ...currentTask, status: "awaiting-qc" });
    setShowUpload(false);
  }

  const isStarted = currentTask.status === "in-progress";
  const isDone = currentTask.status === "awaiting-qc" || currentTask.status === "done";
  const isRework = currentTask.status === "awaiting-rework";

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex items-center justify-between px-7 py-4 bg-white border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ChevronLeft size={18} className="text-muted-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">{currentTask.taskNo}</h1>
            <p className="text-xs text-muted-foreground">{currentTask.jobNo} · {currentTask.workshop}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={currentTask.status} />
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            <Printer size={15} />
            Print
          </button>
        </div>
      </div>

      <div className="px-7 py-6 grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-5">
          {isRework && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle size={18} className="text-red-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-red-700 text-sm">QC Rejected — Rework Required</p>
                <p className="text-red-600 text-xs mt-1">QC engineer has rejected this task. Please review the inspection notes, redo the work, and resubmit.</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border">
              <h2 className="font-bold text-sm text-foreground">Task Information</h2>
            </div>
            <div className="p-5 grid grid-cols-2 gap-5">
              <InfoField label="Task Description" value={currentTask.description} wide />
              <InfoField label="Job Number" value={currentTask.jobNo} />
              <InfoField label="Product Name" value={currentTask.productName} />
              <InfoField label="Part / Assembly SN" value={currentTask.partSN} mono />
              <InfoField label="Workshop" value={currentTask.workshop} />
              <InfoField label="Estimation" value={`${currentTask.estimation} minutes`} />
              <InfoField label="Due Date" value={currentTask.dueDate} />
              <InfoField label="Assigned QC" value={currentTask.assignedQC} />
            </div>
          </div>

          {(isStarted || isDone) && (
            <div className={`rounded-xl border p-5 ${isOvertime && isStarted ? "bg-red-50 border-red-200" : "bg-white border-border"}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">Time Tracking</p>
                  <p className="text-xs text-muted-foreground">Elapsed: {elapsedLabel}</p>
                </div>
                {isStarted && (
                  <div className={`text-right ${isOvertime ? "text-red-600" : "text-blue-600"}`}>
                    <p className="text-2xl font-mono font-bold">{isOvertime ? "+" : ""}{label}</p>
                    <p className="text-xs font-medium">{isOvertime ? "Overtime" : "Remaining"}</p>
                  </div>
                )}
              </div>
              {isStarted && (
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${isOvertime ? "bg-red-500" : "bg-blue-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              )}
              {isDone && !isStarted && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 size={18} />
                  <p className="font-semibold text-sm">Task submitted — Awaiting QC inspection</p>
                </div>
              )}
            </div>
          )}

          {!isDone && (
            <div className="flex gap-3">
              {!isStarted && !isRework && currentTask.status === "pending" && (
                <button
                  onClick={handleStart}
                  className="flex items-center gap-2.5 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm"
                >
                  <Play size={16} />
                  Start Task
                </button>
              )}
              {(isStarted || isRework) && (
                <>
                  <button
                    onClick={handleDone}
                    className="flex items-center gap-2.5 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors text-sm"
                  >
                    <CheckCircle2 size={16} />
                    {isRework ? "Submit Rework" : "Mark as Done"}
                  </button>
                  {isRework && (
                    <button
                      onClick={handleStart}
                      className="flex items-center gap-2.5 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Play size={16} />
                      Start Rework
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {showUpload && (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground">Attach Result Photos & Files</h3>
                <button onClick={() => setShowUpload(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={16} />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/40 transition-all" onClick={() => setUploadedFiles([...uploadedFiles, `photo_${Date.now()}.jpg`])}>
                  <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium text-foreground">Click to upload photos</p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG, PDF up to 20MB</p>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    {uploadedFiles.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-foreground bg-green-50 rounded-lg px-3 py-2">
                        <CheckCircle2 size={14} className="text-green-600" />
                        {f}
                      </div>
                    ))}
                  </div>
                )}
                <button
                  onClick={handleSubmitDone}
                  className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors text-sm"
                >
                  Submit & Send to QC
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <DocumentsPanel task={currentTask} />
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
              <HardHat size={15} className="text-blue-600" />
              <h3 className="font-semibold text-sm">Job Traveler Steps</h3>
            </div>
            <div className="p-4">
              {["Cutting & Bending", "Machining", "Welding", "Painting", "Assembly", "Packing"].map((step, i) => {
                const isCurrent = step === currentTask.workshop;
                const isPast = i < ["Cutting & Bending", "Machining", "Welding", "Painting", "Assembly", "Packing"].indexOf(currentTask.workshop);
                return (
                  <div key={step} className="flex items-center gap-3 py-2">
                    <div className={`size-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isCurrent ? "bg-blue-600 text-white" : isPast ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                      {isPast ? <CheckCircle2 size={12} /> : i + 1}
                    </div>
                    <p className={`text-sm ${isCurrent ? "font-semibold text-blue-700" : isPast ? "text-green-700" : "text-muted-foreground"}`}>{step}</p>
                    {isCurrent && <span className="ml-auto text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Current</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value, wide, mono }: { label: string; value: string; wide?: boolean; mono?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-sm font-medium text-foreground ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}

// ─── Screen: QC Dashboard ─────────────────────────────────────────────────────

function QCDashboard({ onSelectTask }: { onSelectTask: (t: Task) => void }) {
  const awaiting = QC_TASKS.filter((t) => t.status === "awaiting-qc");
  const upcoming = QC_TASKS.filter((t) => t.status === "pending");
  const [search, setSearch] = useState("");

  const filtered = QC_TASKS.filter((t) =>
    search === "" ||
    t.taskNo.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-auto">
      <TopBar title="QC Dashboard" subtitle="Tuesday, November 12, 2024" />
      <div className="px-7 py-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Awaiting QC" value={awaiting.length} icon={<Clock size={22} className="text-amber-600" />} color="bg-amber-100" />
          <StatCard label="Upcoming Tasks" value={upcoming.length} icon={<ClipboardList size={22} className="text-blue-600" />} color="bg-blue-100" />
          <StatCard label="Inspected Today" value={3} icon={<CheckSquare size={22} className="text-green-600" />} color="bg-green-100" />
          <StatCard label="Rejected Today" value={1} icon={<X size={22} className="text-red-600" />} color="bg-red-100" />
        </div>

        {awaiting.length > 0 && (
          <div className="bg-amber-500 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-white/20 flex items-center justify-center">
                <Shield size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{awaiting.length} tasks waiting for your inspection</p>
                <p className="text-amber-100 text-xs mt-0.5">Workers have completed their work and submitted for QC</p>
              </div>
            </div>
            <button
              onClick={() => onSelectTask(awaiting[0])}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-amber-700 font-semibold text-sm hover:bg-amber-50 transition-colors"
            >
              Start Inspection <ChevronRight size={14} />
            </button>
          </div>
        )}

        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-4">
            <h2 className="font-bold text-base text-foreground">Inspection Queue</h2>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-muted/40 focus:outline-none focus:border-blue-400 w-56"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/40">
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Task No.</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Description</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Product / Part</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Workshop</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Status</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Due Date</th>
                  <th className="py-2.5 px-4" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((task) => (
                  <TaskRow key={task.id} task={task} onClick={() => onSelectTask(task)} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: QC Task Detail ───────────────────────────────────────────────────

function QCTaskDetail({ task, onBack, onInspect }: { task: Task; onBack: () => void; onInspect: () => void }) {
  return (
    <div className="flex-1 overflow-auto">
      <div className="flex items-center justify-between px-7 py-4 bg-white border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ChevronLeft size={18} className="text-muted-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">{task.taskNo}</h1>
            <p className="text-xs text-muted-foreground">{task.jobNo} · {task.workshop}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={task.status} />
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            <Printer size={15} />
            Print
          </button>
        </div>
      </div>

      <div className="px-7 py-6 grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-5">
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border">
              <h2 className="font-bold text-sm text-foreground">Task Information</h2>
            </div>
            <div className="p-5 grid grid-cols-2 gap-5">
              <InfoField label="Task Description" value={task.description} wide />
              <InfoField label="Job Number" value={task.jobNo} />
              <InfoField label="Product Name" value={task.productName} />
              <InfoField label="Part / Assembly SN" value={task.partSN} mono />
              <InfoField label="Workshop" value={task.workshop} />
              <InfoField label="Worker" value={task.assignedTo} />
              <InfoField label="Due Date" value={task.dueDate} />
              <InfoField label="QC Assigned" value={task.assignedQC} />
            </div>
          </div>

          {task.attachments.length > 0 && (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
                <CheckCircle2 size={15} className="text-green-600" />
                <h3 className="font-semibold text-sm">Worker Submission</h3>
              </div>
              <div className="p-5 grid grid-cols-3 gap-3">
                {task.attachments.map((a) => (
                  <div key={a} className="rounded-lg border border-border bg-muted/30 p-3 flex flex-col items-center gap-2">
                    {a.endsWith(".jpg") || a.endsWith(".png") ? (
                      <ImageIcon size={28} className="text-muted-foreground" />
                    ) : (
                      <FileText size={28} className="text-muted-foreground" />
                    )}
                    <p className="text-xs text-center text-muted-foreground truncate w-full">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {task.status === "awaiting-qc" && (
            <div className="flex gap-3">
              <button
                onClick={onInspect}
                className="flex items-center gap-2.5 px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors text-sm"
              >
                <Shield size={16} />
                Start Inspection
              </button>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <DocumentsPanel task={task} />
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
              <HardHat size={15} className="text-blue-600" />
              <h3 className="font-semibold text-sm">Job Traveler Steps</h3>
            </div>
            <div className="p-4">
              {["Cutting & Bending", "Machining", "Welding", "Painting", "Assembly", "Packing"].map((step, i) => {
                const isCurrent = step === task.workshop;
                const isPast = i < ["Cutting & Bending", "Machining", "Welding", "Painting", "Assembly", "Packing"].indexOf(task.workshop);
                return (
                  <div key={step} className="flex items-center gap-3 py-2">
                    <div className={`size-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isCurrent ? "bg-amber-500 text-white" : isPast ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                      {isPast ? <CheckCircle2 size={12} /> : i + 1}
                    </div>
                    <p className={`text-sm ${isCurrent ? "font-semibold text-amber-700" : isPast ? "text-green-700" : "text-muted-foreground"}`}>{step}</p>
                    {isCurrent && <span className="ml-auto text-[10px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Inspect</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen: QC Inspection Form ───────────────────────────────────────────────

type CheckResult = "pass" | "fail" | "";

interface InspectionItem {
  no: number;
  task: string;
  result: CheckResult;
  remark: string;
}

const INSPECTION_ITEMS_INITIAL: InspectionItem[] = [
  { no: 1, task: "Oil tank are not dented / deformed\nThùng dầu không bị móp /biến dạng.", result: "", remark: "" },
  { no: 2, task: "Ensure Hydraulic Oil ID Plate is fitted correctly\nĐảm bảo ID Plate của thùng dầu thủy lực đươc gắn chính xác", result: "", remark: "" },
  { no: 3, task: "Oil tank has been pressure tested as specified / Thùng dầu đã được kiểm tra áp lực như quy định", result: "", remark: "" },
  { no: 4, task: "Visually check all connection points have been fully welded\nKiểm tra ngoại quan tất cả điểm kết nối đã được hàn đầy đủ", result: "", remark: "" },
  { no: 5, task: "Remove and clean anti-rust oil, dusts on all flanges, pipes, machined parts before installing them into the tank. / Vệ sinh và làm sạch các loại dầu chống rỉ, bụi bẩn trên tất cả các mặt bích, ống, chi tiết có bề mặt gia công trước khi lắp chúng vào thùng", result: "", remark: "" },
  { no: 6, task: "No metal shavings, debris, dusts, strange object in the tank\nKhông có mạt sắt, ba vớ, bụi bẩn, vật thể lạ trong thùng", result: "", remark: "" },
  { no: 7, task: "Use white cloth and Flashlight to check for cleaning of tank before adding anti-rust oil all inside faces / Sử dụng vải trắng và đèn pin để kiểm tra độ sạch của thùng trước khi bôi dầu bảo quản tất cả mặt bên trong", result: "", remark: "" },
  { no: 8, task: "Used correct Anti-rust oil / Sử dụng đúng dầu bảo quản (ANTICORIT VCI UNI 0 40 OIL)", result: "", remark: "" },
  { no: 9, task: "Used enough amount of anti-rust oil (400 ml for 1000 Liter tank capacity) / Sử dụng đúng lượng dầu bảo quản (400 ml cho thể tích thùng 1000 lit)", result: "", remark: "" },
  { no: 10, task: "Remove and clean anti-rust oil, dusts on all remaining flanges, pipes, machined parts / Vệ sinh và làm sạch các loại dầu chống rỉ còn lại", result: "", remark: "" },
  { no: 11, task: "Add more anti-rust oil ANTICORIT VCI UNI O 40 to compensate for oil evaporation if open the tank to assembling.", result: "", remark: "" },
  { no: 12, task: "Close the tank cap tightly immediately.\nĐóng chặt nắp thùng ngay lập tực", result: "", remark: "" },
  { no: 13, task: "Paste QC stamp after checking and transfer to packaging / machine assembly\nDán tem QC sau khi kiểm tra", result: "", remark: "" },
];

function QCInspectionForm({ task, onBack, onComplete }: { task: Task; onBack: () => void; onComplete: (approved: boolean) => void }) {
  const [items, setItems] = useState<InspectionItem[]>(INSPECTION_ITEMS_INITIAL.map((i) => ({ ...i })));
  const [partNumber, setPartNumber] = useState(task.partSN);
  const [jobNumber] = useState(task.jobNo);
  const [productionDate, setProductionDate] = useState("2024-11-12");
  const [productionShift, setProductionShift] = useState("Morning");
  const [name, setName] = useState(task.assignedQC);
  const [projectNo, setProjectNo] = useState("PRJ-2024-087");
  const [overallNotes, setOverallNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function setResult(no: number, result: CheckResult) {
    setItems((prev) => prev.map((item) => item.no === no ? { ...item, result } : item));
  }
  function setRemark(no: number, remark: string) {
    setItems((prev) => prev.map((item) => item.no === no ? { ...item, remark } : item));
  }

  const allAnswered = items.every((i) => i.result !== "");
  const anyFail = items.some((i) => i.result === "fail");
  const passCount = items.filter((i) => i.result === "pass").length;
  const failCount = items.filter((i) => i.result === "fail").length;

  function handleSubmit(approved: boolean) {
    setSubmitted(true);
    setTimeout(() => onComplete(approved), 800);
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex items-center justify-between px-7 py-4 bg-white border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ChevronLeft size={18} className="text-muted-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">QC Inspection Form</h1>
            <p className="text-xs text-muted-foreground">{task.taskNo} · {task.workshop}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            <Printer size={15} />
            Print
          </button>
        </div>
      </div>

      <div className="px-7 py-6 max-w-5xl">
        <div className="bg-white rounded-xl border border-border overflow-hidden mb-6">
          <div className="bg-[#0d2b5e] px-6 py-5 text-center">
            <h2 className="text-white font-bold text-lg">TANK VISUAL INSPECTION REPORT</h2>
            <p className="text-blue-200 text-sm mt-1">KIỂM TRA NGOẠI QUAN THÙNG DẦU</p>
          </div>

          <div className="p-5 grid grid-cols-3 gap-4 border-b border-border">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Part Number</label>
              <input value={partNumber} onChange={(e) => setPartNumber(e.target.value)} className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Job Number</label>
              <input readOnly value={jobNumber} className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-muted/40 text-muted-foreground" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Production Date</label>
              <input type="date" value={productionDate} onChange={(e) => setProductionDate(e.target.value)} className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">QC Engineer Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Project No.</label>
              <input value={projectNo} onChange={(e) => setProjectNo(e.target.value)} className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Production Shift</label>
              <select value={productionShift} onChange={(e) => setProductionShift(e.target.value)} className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400">
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Night</option>
              </select>
            </div>
          </div>

          <div className="px-5 py-3 bg-muted/30 flex items-center gap-6 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Answered:</span>
              <span className="text-sm font-bold text-foreground">{passCount + failCount}/{items.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-green-500" />
              <span className="text-xs text-green-700 font-semibold">Pass: {passCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-red-500" />
              <span className="text-xs text-red-700 font-semibold">Fail: {failCount}</span>
            </div>
            <div className="flex-1 h-2 bg-border rounded-full overflow-hidden ml-2">
              <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${((passCount + failCount) / items.length) * 100}%` }} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="py-3 px-4 text-left text-xs font-semibold w-12">No.</th>
                  <th className="py-3 px-4 text-left text-xs font-semibold">Task / Nội Dung Kiểm Tra</th>
                  <th className="py-3 px-4 text-center text-xs font-semibold w-40">Result<br /><span className="font-normal text-slate-300">✓ Pass / ✗ Fail</span></th>
                  <th className="py-3 px-4 text-left text-xs font-semibold w-52">Remark / Ghi Chú</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.no} className={`border-b border-border ${item.result === "fail" ? "bg-red-50" : item.result === "pass" ? "bg-green-50/40" : "hover:bg-muted/20"} transition-colors`}>
                    <td className="py-3 px-4"><span className="text-sm font-bold text-muted-foreground">{item.no}</span></td>
                    <td className="py-3 px-4"><p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{item.task}</p></td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => setResult(item.no, item.result === "pass" ? "" : "pass")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${item.result === "pass" ? "bg-green-600 text-white border-green-600" : "border-green-300 text-green-700 hover:bg-green-50"}`}>✓ Pass</button>
                        <button onClick={() => setResult(item.no, item.result === "fail" ? "" : "fail")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${item.result === "fail" ? "bg-red-600 text-white border-red-600" : "border-red-300 text-red-700 hover:bg-red-50"}`}>✗ Fail</button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <input value={item.remark} onChange={(e) => setRemark(item.no, e.target.value)} placeholder="Notes..." className="w-full text-xs border border-border rounded px-2 py-1.5 focus:outline-none focus:border-blue-400 bg-white" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-5 border-t border-border">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">Overall Remarks</label>
            <textarea value={overallNotes} onChange={(e) => setOverallNotes(e.target.value)} placeholder="Add overall inspection remarks..." rows={3} className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 resize-none" />
          </div>

          {anyFail && (
            <div className="mx-5 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-600 shrink-0" />
              <p className="text-sm text-red-700 font-medium">{failCount} item(s) failed inspection. Approval is not recommended.</p>
            </div>
          )}

          {submitted ? (
            <div className="px-5 pb-5 flex items-center gap-2 text-green-600">
              <CheckCircle2 size={18} />
              <p className="font-semibold text-sm">Inspection submitted successfully!</p>
            </div>
          ) : (
            <div className="px-5 pb-5 flex gap-3">
              <button onClick={() => handleSubmit(true)} disabled={!allAnswered || anyFail} className={`flex items-center gap-2.5 px-6 py-3 font-semibold rounded-xl text-sm transition-colors ${allAnswered && !anyFail ? "bg-green-600 text-white hover:bg-green-700" : "bg-green-200 text-green-400 cursor-not-allowed"}`}>
                <CheckCircle2 size={16} />Approve
              </button>
              <button onClick={() => handleSubmit(false)} disabled={!allAnswered} className={`flex items-center gap-2.5 px-6 py-3 font-semibold rounded-xl text-sm transition-colors ${allAnswered ? "bg-red-600 text-white hover:bg-red-700" : "bg-red-200 text-red-400 cursor-not-allowed"}`}>
                <X size={16} />Reject & Request Rework
              </button>
              <button onClick={onBack} className="ml-auto flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Screen: PE Dashboard ─────────────────────────────────────────────────────

interface PEDashboardProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onCreateJob: () => void;
}

function PEDashboard({ jobs, onSelectJob, onCreateJob }: PEDashboardProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | JobStatus>("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | Priority>("all");

  const unassigned = jobs.filter((j) => j.status === "unassigned").length;
  const assigned = jobs.filter((j) => j.status === "assigned").length;
  const inProgress = jobs.filter((j) => j.status === "in-progress").length;
  const awaitingQC = jobs.filter((j) => j.status === "awaiting-qc").length;
  const done = jobs.filter((j) => j.status === "done").length;

  const urgent = jobs.filter((j) => j.priority === "urgent" && j.status !== "done");

  const filtered = jobs.filter((j) => {
    const q = search.toLowerCase();
    const matchSearch =
      search === "" ||
      j.jobNo.toLowerCase().includes(q) ||
      j.productName.toLowerCase().includes(q) ||
      j.description.toLowerCase().includes(q) ||
      j.projectNo.toLowerCase().includes(q) ||
      j.assignedWorker.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || j.status === statusFilter;
    const matchPriority = priorityFilter === "all" || j.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <div className="flex-1 overflow-auto">
      <TopBar title="Project Engineer Dashboard" subtitle="Tuesday, November 12, 2024" />
      <div className="px-7 py-6 space-y-6">

        {/* Stats row */}
        <div className="grid grid-cols-5 gap-4">
          <StatCard label="Unassigned" value={unassigned} icon={<CircleDot size={20} className="text-slate-500" />} color="bg-slate-100" />
          <StatCard label="Assigned" value={assigned} icon={<UserCheck size={20} className="text-purple-600" />} color="bg-purple-100" />
          <StatCard label="In Progress" value={inProgress} icon={<Play size={20} className="text-blue-600" />} color="bg-blue-100" />
          <StatCard label="Awaiting QC" value={awaitingQC} icon={<Shield size={20} className="text-amber-600" />} color="bg-amber-100" />
          <StatCard label="Completed" value={done} icon={<CheckCircle2 size={20} className="text-green-600" />} color="bg-green-100" />
        </div>

        {/* Progress bar overview */}
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-blue-600" />
              <h3 className="font-semibold text-sm text-foreground">Job Pipeline Overview</h3>
            </div>
            <p className="text-xs text-muted-foreground">{jobs.length} total jobs</p>
          </div>
          <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
            {unassigned > 0 && <div className="bg-slate-300 transition-all" style={{ width: `${(unassigned / jobs.length) * 100}%` }} title="Unassigned" />}
            {assigned > 0 && <div className="bg-purple-400 transition-all" style={{ width: `${(assigned / jobs.length) * 100}%` }} title="Assigned" />}
            {inProgress > 0 && <div className="bg-blue-500 transition-all" style={{ width: `${(inProgress / jobs.length) * 100}%` }} title="In Progress" />}
            {awaitingQC > 0 && <div className="bg-amber-400 transition-all" style={{ width: `${(awaitingQC / jobs.length) * 100}%` }} title="Awaiting QC" />}
            {done > 0 && <div className="bg-green-500 transition-all" style={{ width: `${(done / jobs.length) * 100}%` }} title="Done" />}
          </div>
          <div className="flex items-center gap-5 mt-3 flex-wrap">
            {[
              { label: "Unassigned", color: "bg-slate-300", count: unassigned },
              { label: "Assigned", color: "bg-purple-400", count: assigned },
              { label: "In Progress", color: "bg-blue-500", count: inProgress },
              { label: "Awaiting QC", color: "bg-amber-400", count: awaitingQC },
              { label: "Done", color: "bg-green-500", count: done },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span className={`size-2.5 rounded-sm ${item.color}`} />
                <span className="text-xs text-muted-foreground">{item.label} ({item.count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent alert */}
        {urgent.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle size={20} className="text-red-600 shrink-0" />
              <div>
                <p className="text-red-700 font-semibold text-sm">{urgent.length} urgent job(s) need immediate attention</p>
                <p className="text-red-500 text-xs">Review and assign workers as soon as possible</p>
              </div>
            </div>
            <button
              onClick={() => onSelectJob(urgent[0])}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg text-white font-semibold text-sm hover:bg-red-700 transition-colors"
            >
              View Urgent <ChevronRight size={14} />
            </button>
          </div>
        )}

        {/* Job table */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-3 flex-wrap">
            <h2 className="font-bold text-base text-foreground">All Jobs</h2>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search job, product, worker..."
                  className="pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-muted/40 focus:outline-none focus:border-blue-400 w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as "all" | JobStatus)}
                className="text-sm border border-border rounded-lg px-3 py-2 bg-muted/40 focus:outline-none focus:border-blue-400 text-foreground"
              >
                <option value="all">All Statuses</option>
                <option value="unassigned">Unassigned</option>
                <option value="assigned">Assigned</option>
                <option value="in-progress">In Progress</option>
                <option value="awaiting-qc">Awaiting QC</option>
                <option value="done">Done</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value as "all" | Priority)}
                className="text-sm border border-border rounded-lg px-3 py-2 bg-muted/40 focus:outline-none focus:border-blue-400 text-foreground"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <button
                onClick={onCreateJob}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={15} />
                New Job
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <Briefcase size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">No jobs match your filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/40">
                    <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Job No.</th>
                    <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Description</th>
                    <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Workshop</th>
                    <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Assigned To</th>
                    <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Priority</th>
                    <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="py-2.5 px-4 text-left text-xs font-semibold text-muted-foreground">Due Date</th>
                    <th className="py-2.5 px-4" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((job) => (
                    <tr
                      key={job.id}
                      onClick={() => onSelectJob(job)}
                      className="border-b border-border last:border-0 hover:bg-blue-50/40 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{job.jobNo}</span>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{job.projectNo}</p>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <p className="text-sm font-semibold text-foreground line-clamp-1">{job.productName}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{job.description}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                          {workshopIcon(job.workshop)}
                          {job.workshop}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {job.assignedWorker ? (
                          <div>
                            <p className="text-sm text-foreground">{job.assignedWorker}</p>
                            <p className="text-xs text-muted-foreground">QC: {job.assignedQC || "—"}</p>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">Not assigned</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <PriorityBadge priority={job.priority} />
                      </td>
                      <td className="py-3 px-4">
                        <JobStatusBadge status={job.status} />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CalendarDays size={12} />
                          {job.dueDate}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => { e.stopPropagation(); onSelectJob(job); }}
                            className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Screen: PE Job Detail ────────────────────────────────────────────────────

interface PEJobDetailProps {
  job: Job | null;
  onBack: () => void;
  onSave: (job: Job) => void;
  onDelete?: (id: string) => void;
}

function PEJobDetail({ job, onBack, onSave, onDelete }: PEJobDetailProps) {
  const isNew = job === null;

  const [form, setForm] = useState<Job>(
    job ?? {
      id: `j${Date.now()}`,
      jobNo: `JOB-2024-${String(Math.floor(Math.random() * 900) + 100)}`,
      projectNo: "",
      productName: "",
      partSN: "",
      workshop: "Welding",
      description: "",
      priority: "medium",
      status: "unassigned",
      assignedWorker: "",
      assignedQC: "",
      estimation: 120,
      dueDate: "",
      drawings: [],
      notes: "",
      createdDate: new Date().toISOString().split("T")[0],
    }
  );

  const [saved, setSaved] = useState(false);
  const [newDrawing, setNewDrawing] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  function update<K extends keyof Job>(key: K, value: Job[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    // Auto-set status based on assignment
    let status = form.status;
    if (form.assignedWorker && form.status === "unassigned") {
      status = "assigned";
    } else if (!form.assignedWorker) {
      status = "unassigned";
    }
    const finalJob = { ...form, status };
    onSave(finalJob);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function addDrawing() {
    if (newDrawing.trim()) {
      update("drawings", [...form.drawings, newDrawing.trim()]);
      setNewDrawing("");
    }
  }

  function removeDrawing(idx: number) {
    update("drawings", form.drawings.filter((_, i) => i !== idx));
  }

  const isOverdue = form.dueDate && new Date(form.dueDate) < new Date();

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-7 py-4 bg-white border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ChevronLeft size={18} className="text-muted-foreground" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-foreground">
              {isNew ? "New Job" : `Edit: ${form.jobNo}`}
            </h1>
            <p className="text-xs text-muted-foreground">
              {isNew ? "Create a new manufacturing job" : `${form.productName} · ${form.workshop}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!isNew && <JobStatusBadge status={form.status} />}
          <PriorityBadge priority={form.priority} />
          {!isNew && onDelete && (
            <button
              onClick={() => setConfirmDelete(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-200 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={14} />
              Delete
            </button>
          )}
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${saved ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            {saved ? <CheckCircle2 size={15} /> : <Save size={15} />}
            {saved ? "Saved!" : "Save Job"}
          </button>
        </div>
      </div>

      {/* Delete confirm overlay */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 size={18} className="text-red-600" />
              </div>
              <div>
                <p className="font-bold text-foreground">Delete Job?</p>
                <p className="text-xs text-muted-foreground">{form.jobNo}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-5">This action cannot be undone. The job and all its associated data will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => { onDelete?.(form.id); onBack(); }} className="flex-1 py-2.5 bg-red-600 text-white font-semibold rounded-xl text-sm hover:bg-red-700 transition-colors">Delete</button>
              <button onClick={() => setConfirmDelete(false)} className="flex-1 py-2.5 border border-border text-foreground font-medium rounded-xl text-sm hover:bg-muted transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="px-7 py-6 grid grid-cols-3 gap-6">
        {/* Main form */}
        <div className="col-span-2 space-y-5">

          {/* Overdue warning */}
          {isOverdue && form.status !== "done" && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
              <AlertTriangle size={18} className="text-red-600 shrink-0" />
              <p className="text-sm text-red-700 font-medium">This job is past its due date. Update the schedule or escalate.</p>
            </div>
          )}

          {/* Job Information */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
              <Briefcase size={15} className="text-blue-600" />
              <h2 className="font-bold text-sm text-foreground">Job Information</h2>
            </div>
            <div className="p-5 grid grid-cols-2 gap-5">
              <FormField label="Job Number">
                <input value={form.jobNo} onChange={(e) => update("jobNo", e.target.value)} className="form-input" />
              </FormField>
              <FormField label="Project Number">
                <input value={form.projectNo} onChange={(e) => update("projectNo", e.target.value)} placeholder="PRJ-2024-..." className="form-input" />
              </FormField>
              <FormField label="Product Name" wide>
                <input value={form.productName} onChange={(e) => update("productName", e.target.value)} placeholder="e.g. Rubber Tired Gantry Crane" className="form-input" />
              </FormField>
              <FormField label="Part / Assembly SN">
                <input value={form.partSN} onChange={(e) => update("partSN", e.target.value)} placeholder="e.g. RTG-2024-001-MF" className="form-input font-mono" />
              </FormField>
              <FormField label="Workshop">
                <select value={form.workshop} onChange={(e) => update("workshop", e.target.value)} className="form-input">
                  {WORKSHOPS.map((w) => <option key={w}>{w}</option>)}
                </select>
              </FormField>
              <FormField label="Description" wide>
                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Describe the work scope, materials, standards..."
                  rows={3}
                  className="form-input resize-none"
                />
              </FormField>
            </div>
          </div>

          {/* Schedule & Priority */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
              <CalendarDays size={15} className="text-blue-600" />
              <h2 className="font-bold text-sm text-foreground">Schedule & Priority</h2>
            </div>
            <div className="p-5 grid grid-cols-3 gap-5">
              <FormField label="Priority">
                <select value={form.priority} onChange={(e) => update("priority", e.target.value as Priority)} className="form-input">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </FormField>
              <FormField label="Estimation (minutes)">
                <input
                  type="number"
                  value={form.estimation}
                  onChange={(e) => update("estimation", Number(e.target.value))}
                  min={0}
                  className="form-input"
                />
              </FormField>
              <FormField label="Due Date">
                <input type="date" value={form.dueDate} onChange={(e) => update("dueDate", e.target.value)} className="form-input" />
              </FormField>
              <FormField label="Status">
                <select value={form.status} onChange={(e) => update("status", e.target.value as JobStatus)} className="form-input">
                  <option value="unassigned">Unassigned</option>
                  <option value="assigned">Assigned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="awaiting-qc">Awaiting QC</option>
                  <option value="done">Done</option>
                </select>
              </FormField>
              <FormField label="Created Date">
                <input readOnly value={form.createdDate} className="form-input bg-muted/40 text-muted-foreground" />
              </FormField>
            </div>
          </div>

          {/* Assignment */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
              <Users size={15} className="text-blue-600" />
              <h2 className="font-bold text-sm text-foreground">Worker & QC Assignment</h2>
            </div>
            <div className="p-5 grid grid-cols-2 gap-5">
              <FormField label="Assign Worker">
                <select value={form.assignedWorker} onChange={(e) => update("assignedWorker", e.target.value)} className="form-input">
                  <option value="">— Not assigned —</option>
                  {WORKERS.map((w) => <option key={w}>{w}</option>)}
                </select>
              </FormField>
              <FormField label="Assign QC Engineer">
                <select value={form.assignedQC} onChange={(e) => update("assignedQC", e.target.value)} className="form-input">
                  <option value="">— Not assigned —</option>
                  {QC_ENGINEERS.map((q) => <option key={q}>{q}</option>)}
                </select>
              </FormField>

              {/* Worker availability quick view */}
              <div className="col-span-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Available Workers</p>
                <div className="flex flex-wrap gap-2">
                  {WORKERS.map((w) => (
                    <button
                      key={w}
                      onClick={() => update("assignedWorker", form.assignedWorker === w ? "" : w)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${
                        form.assignedWorker === w
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "border-border text-foreground hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      <span className="size-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                        {w.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </span>
                      {w}
                    </button>
                  ))}
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Available QC Engineers</p>
                <div className="flex flex-wrap gap-2">
                  {QC_ENGINEERS.map((q) => (
                    <button
                      key={q}
                      onClick={() => update("assignedQC", form.assignedQC === q ? "" : q)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${
                        form.assignedQC === q
                          ? "bg-amber-500 border-amber-500 text-white"
                          : "border-border text-foreground hover:border-amber-300 hover:bg-amber-50"
                      }`}
                    >
                      <Shield size={12} />
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
              <FileText size={15} className="text-blue-600" />
              <h2 className="font-bold text-sm text-foreground">Engineering Notes</h2>
            </div>
            <div className="p-5">
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Add any engineering notes, special instructions, or constraints..."
                rows={4}
                className="form-input resize-none w-full"
              />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">

          {/* Job summary card */}
          <div className="bg-[#0d2b5e] rounded-xl p-5 text-white">
            <p className="text-xs font-semibold text-blue-300 uppercase tracking-widest mb-4">Job Summary</p>
            <div className="space-y-3">
              <div>
                <p className="text-[11px] text-blue-300">Job Number</p>
                <p className="font-mono font-bold text-sm">{form.jobNo || "—"}</p>
              </div>
              <div>
                <p className="text-[11px] text-blue-300">Product</p>
                <p className="text-sm font-semibold">{form.productName || "—"}</p>
              </div>
              <div>
                <p className="text-[11px] text-blue-300">Workshop</p>
                <p className="text-sm">{form.workshop}</p>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-[11px] text-blue-300">Due</p>
                  <p className={`text-sm font-semibold ${isOverdue ? "text-red-300" : "text-white"}`}>{form.dueDate || "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] text-blue-300">Est.</p>
                  <p className="text-sm">{form.estimation}m</p>
                </div>
              </div>
              <div className="pt-2 border-t border-white/10">
                <p className="text-[11px] text-blue-300 mb-1">Worker</p>
                <p className="text-sm">{form.assignedWorker || <span className="text-blue-400 italic">Not assigned</span>}</p>
              </div>
              <div>
                <p className="text-[11px] text-blue-300 mb-1">QC Engineer</p>
                <p className="text-sm">{form.assignedQC || <span className="text-blue-400 italic">Not assigned</span>}</p>
              </div>
            </div>
          </div>

          {/* Drawings */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center gap-2">
              <ZoomIn size={15} className="text-blue-600" />
              <h3 className="font-semibold text-sm">Engineering Drawings</h3>
            </div>
            <div className="p-4 space-y-3">
              {form.drawings.length === 0 && (
                <p className="text-xs text-muted-foreground italic text-center py-2">No drawings attached</p>
              )}
              {form.drawings.map((d, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-muted/20 group">
                  <FileText size={14} className="text-blue-600 shrink-0" />
                  <p className="text-xs flex-1 font-medium text-foreground truncate">{d}</p>
                  <button
                    onClick={() => removeDrawing(i)}
                    className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  value={newDrawing}
                  onChange={(e) => setNewDrawing(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addDrawing()}
                  placeholder="DWG-001.pdf"
                  className="flex-1 text-xs border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 bg-white"
                />
                <button
                  onClick={addDrawing}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50/40 transition-all">
                <Upload size={18} className="mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">Upload drawing files</p>
                <p className="text-[11px] text-muted-foreground/70">PDF, DWG up to 50MB</p>
              </div>
            </div>
          </div>

          {/* Save button repeat */}
          <button
            onClick={handleSave}
            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-colors ${saved ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
            {saved ? "Saved Successfully!" : isNew ? "Create Job" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Utility: form field wrapper
function FormField({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5">{label}</label>
      {children}
    </div>
  );
}

// ─── Form Builder: Field Preview ─────────────────────────────────────────────

function FieldPreview({ field, onTableCellDrop }: { field: FormField; onTableCellDrop?: (field: FormField, row: number, col: number) => void }) {
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const inputCls = "w-full text-xs border border-border rounded px-2.5 py-1.5 bg-white text-foreground outline-none pointer-events-none";
  const labelCls = "block text-xs font-medium text-slate-700 mb-1";
  const reqMark = field.required ? <span className="text-red-500 ml-0.5">*</span> : null;

  if (field.type === "textbox" || field.type === "number") {
    return (
      <div>
        <label className={labelCls}>{field.label}{reqMark}</label>
        <input className={inputCls} placeholder={field.placeholder || ""} readOnly />
        {field.helpText && <p className="text-[10px] text-muted-foreground mt-0.5">{field.helpText}</p>}
      </div>
    );
  }
  if (field.type === "textarea") {
    return (
      <div>
        <label className={labelCls}>{field.label}{reqMark}</label>
        <textarea className={inputCls} rows={field.rows || 2} placeholder={field.placeholder || ""} readOnly />
        {field.helpText && <p className="text-[10px] text-muted-foreground mt-0.5">{field.helpText}</p>}
      </div>
    );
  }
  if (field.type === "select") {
    return (
      <div>
        <label className={labelCls}>{field.label}{reqMark}</label>
        <select className={inputCls} disabled>
          <option>{field.placeholder || "Select..."}</option>
          {(field.options || []).map(o => <option key={o.value}>{o.label}</option>)}
        </select>
      </div>
    );
  }
  if (field.type === "radio") {
    return (
      <div>
        <label className={labelCls}>{field.label}{reqMark}</label>
        <div className={field.inline ? "flex gap-4 flex-wrap" : "space-y-1"}>
          {(field.options || []).map(o => (
            <label key={o.value} className="flex items-center gap-1.5 text-xs text-slate-700 cursor-default">
              <input type="radio" disabled className="pointer-events-none" /> {o.label}
            </label>
          ))}
        </div>
      </div>
    );
  }
  if (field.type === "passfail") {
    return (
      <div>
        <label className={labelCls}>{field.label}{reqMark}</label>
        <div className="flex gap-2 flex-wrap">
          <button className="flex-1 rounded-lg px-3 py-2 text-xs font-semibold border-2 transition-colors bg-green-600 text-white border-green-600" disabled>✓ Pass</button>
          <button className="flex-1 rounded-lg px-3 py-2 text-xs font-semibold border-2 transition-colors bg-red-600 text-white border-red-600" disabled>✗ Fail</button>
        </div>
      </div>
    );
  }
  if (field.type === "checkbox") {
    return (
      <div>
        <label className={labelCls}>{field.label}{reqMark}</label>
        <div className={field.inline ? "flex gap-4 flex-wrap" : "space-y-1"}>
          {(field.options || []).map(o => (
            <label key={o.value} className="flex items-center gap-1.5 text-xs text-slate-700 cursor-default">
              <input type="checkbox" disabled className="pointer-events-none" /> {o.label}
            </label>
          ))}
        </div>
      </div>
    );
  }
  if (field.type === "datetime") {
    return (
      <div>
        <label className={labelCls}>{field.label}{reqMark}</label>
        <input type={field.dateType || "date"} className={inputCls} readOnly />
      </div>
    );
  }
  if (field.type === "file") {
    return (
      <div>
        <label className={labelCls}>{field.label}{reqMark}</label>
        <div className="flex items-center justify-center border border-dashed border-border rounded py-3 text-[11px] text-muted-foreground gap-1.5 bg-slate-50">
          <Upload size={12} /> Click to upload or drag file here
        </div>
      </div>
    );
  }
  if (field.type === "signature") {
    return (
      <div>
        <label className={labelCls}>{field.label}{reqMark}</label>
        <div className="border border-border rounded bg-slate-50 flex items-center justify-center text-[11px] text-muted-foreground"
          style={{ height: field.signatureHeight || 80 }}>
          <PenLine size={12} className="mr-1" /> Sign here
        </div>
      </div>
    );
  }
  if (field.type === "button") {
    const btnCls = field.buttonStyle === "danger" ? "bg-red-600 text-white" :
                   field.buttonStyle === "secondary" ? "bg-slate-200 text-slate-700" :
                   "bg-[#0d2b5e] text-white";
    return (
      <div>
        <button className={`text-xs px-4 py-1.5 rounded font-medium pointer-events-none ${btnCls}`}>
          {field.buttonLabel || "Button"}
        </button>
      </div>
    );
  }
  if (field.type === "panel") {
    return (
      <div className="border border-border rounded bg-slate-50">
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-slate-100 rounded-t">
          <span className="text-xs font-semibold text-slate-700">{field.panelTitle || "Panel"}</span>
          {field.collapsible && <ChevronDown size={12} className="text-slate-400" />}
        </div>
        <div className="p-3 min-h-[32px]">
          <p className="text-[10px] text-muted-foreground italic">Drop fields inside panel</p>
        </div>
      </div>
    );
  }
  if (field.type === "columns") {
    const cols = field.columnCount || 2;
    return (
      <div>
        <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className="border border-dashed border-border rounded p-2 min-h-[36px] text-[10px] text-center text-muted-foreground">Col {i + 1}</div>
          ))}
        </div>
      </div>
    );
  }
  if (field.type === "tab") {
    const tabs = field.tabs || [{ label: "Tab 1", id: "t1" }];
    return (
      <div>
        <div className="flex border-b border-border">
          {tabs.map((t, i) => (
            <span key={t.id} className={`text-xs px-3 py-1.5 border-b-2 ${i === 0 ? "border-[#0d2b5e] text-[#0d2b5e] font-semibold" : "border-transparent text-muted-foreground"} -mb-px`}>{t.label}</span>
          ))}
        </div>
        <div className="p-2 border border-t-0 border-border rounded-b min-h-[32px]">
          <p className="text-[10px] text-muted-foreground italic">Tab content area</p>
        </div>
      </div>
    );
  }
  if (field.type === "table") {
    const headers = field.tableHeaders || ["Column 1", "Column 2"];
    const cells = field.cells ?? [headers.map(() => [] as FormField[])];
    return (
      <div>
        <label className={labelCls}>{field.label}{reqMark}</label>
        <table className="w-full text-[11px] border border-border rounded overflow-hidden">
          <thead className="bg-slate-100">
            <tr>{headers.map(h => <th key={h} className="px-2 py-1 text-left font-medium border-r border-border last:border-0">{h}</th>)}</tr>
          </thead>
          <tbody>
            {cells.map((rowCells, rowIndex) => (
              <tr key={rowIndex} className="border-t border-border">
                {rowCells.map((cellFields, colIndex) => (
                  <td key={colIndex}
                    className={`px-2 py-2 border-r border-border last:border-0 align-top ${activeCell === `${rowIndex}-${colIndex}` ? "bg-blue-50" : ""}`}
                    onDragOver={e => { e.preventDefault(); e.stopPropagation(); setActiveCell(`${rowIndex}-${colIndex}`); }}
                    onDragLeave={e => { e.stopPropagation(); setActiveCell(null); }}
                    onDrop={e => { e.preventDefault(); e.stopPropagation(); setActiveCell(null); onTableCellDrop?.(field, rowIndex, colIndex); }}
                  >
                    {cellFields.length === 0 ? (
                      <div className="min-h-[48px] flex items-center justify-center text-[10px] text-slate-400 italic">Drop field here</div>
                    ) : (
                      <div className="space-y-2">
                        {cellFields.map(nested => (
                          <div key={nested.id} className="border border-slate-200 rounded p-2 bg-slate-50 text-[10px] text-slate-700">
                            <div className="font-semibold">{fieldTypeLabel(nested.type)}</div>
                            {nested.label && <div className="text-[10px] text-slate-500 truncate">{nested.label}</div>}
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {field.allowAddRow && <button className="text-[10px] text-blue-600 mt-1 flex items-center gap-0.5"><Plus size={10} /> Add row</button>}
      </div>
    );
  }
  return (
    <div>
      <label className={labelCls}>{field.label}</label>
      <div className="text-xs text-muted-foreground italic">{fieldTypeLabel(field.type)}</div>
    </div>
  );
}

// ─── Form Builder: Properties Panel ──────────────────────────────────────────

function PropertiesPanel({
  field,
  onChange,
  onDelete,
}: {
  field: FormField;
  onChange: (updated: FormField) => void;
  onDelete: () => void;
}) {
  const propInputCls = "w-full text-xs border border-border rounded px-2.5 py-1.5 bg-white outline-none focus:border-blue-400 transition-colors";
  const propLabelCls = "block text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1";

  function update(patch: Partial<FormField>) { onChange({ ...field, ...patch }); }

  const isLayout = ["panel", "columns", "tab", "table"].includes(field.type);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-white">
        <div className="flex items-center justify-between mb-0.5">
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${fieldTypeBadgeColor(field.type)}`}>{fieldTypeLabel(field.type)}</span>
          <button onClick={onDelete} className="text-red-400 hover:text-red-600 transition-colors p-0.5">
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {/* Label */}
        {!["button"].includes(field.type) && (
          <div>
            <label className={propLabelCls}>Label</label>
            <input className={propInputCls} value={field.label} onChange={e => update({ label: e.target.value })} />
          </div>
        )}

        {/* Width */}
        {!isLayout && (
          <div>
            <label className={propLabelCls}>Width</label>
            <select className={propInputCls} value={field.width || "full"} onChange={e => update({ width: e.target.value as FormField["width"] })}>
              <option value="full">Full width</option>
              <option value="half">Half width</option>
              <option value="third">One third</option>
            </select>
          </div>
        )}

        {/* Required */}
        {!isLayout && !["button"].includes(field.type) && (
          <div className="flex items-center justify-between">
            <span className={propLabelCls + " mb-0"}>Required</span>
            <button onClick={() => update({ required: !field.required })}
              className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${field.required ? "bg-[#0d2b5e]" : "bg-slate-200"}`}>
              <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform mt-0.5 ${field.required ? "translate-x-4" : "translate-x-0.5"}`} />
            </button>
          </div>
        )}

        {/* Placeholder */}
        {["textbox", "textarea", "select", "number"].includes(field.type) && (
          <div>
            <label className={propLabelCls}>Placeholder</label>
            <input className={propInputCls} value={field.placeholder || ""} onChange={e => update({ placeholder: e.target.value })} />
          </div>
        )}

        {/* Rows (textarea) */}
        {field.type === "textarea" && (
          <div>
            <label className={propLabelCls}>Rows</label>
            <input type="number" min={1} max={20} className={propInputCls} value={field.rows || 3} onChange={e => update({ rows: Number(e.target.value) })} />
          </div>
        )}

        {/* Default value */}
        {["textbox", "number"].includes(field.type) && (
          <div>
            <label className={propLabelCls}>Default Value</label>
            <input className={propInputCls} value={field.defaultValue || ""} onChange={e => update({ defaultValue: e.target.value })} />
          </div>
        )}

        {/* Help text */}
        {!isLayout && !["button"].includes(field.type) && (
          <div>
            <label className={propLabelCls}>Help Text</label>
            <input className={propInputCls} value={field.helpText || ""} onChange={e => update({ helpText: e.target.value })} placeholder="Optional hint..." />
          </div>
        )}

        {/* Options (select, radio, checkbox) */}
        {["select", "radio", "checkbox"].includes(field.type) && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={propLabelCls + " mb-0"}>Options</label>
              <button onClick={() => update({ options: [...(field.options || []), { label: `Option ${(field.options || []).length + 1}`, value: `opt${(field.options || []).length + 1}` }] })}
                className="text-[10px] text-blue-600 hover:text-blue-800 flex items-center gap-0.5"><Plus size={10} /> Add</button>
            </div>
            <div className="space-y-1.5">
              {(field.options || []).map((opt, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <input className={propInputCls} value={opt.label} onChange={e => {
                    const updated = (field.options || []).map((o, j) => j === i ? { ...o, label: e.target.value, value: e.target.value.toLowerCase().replace(/\s+/g, "_") } : o);
                    update({ options: updated });
                  }} />
                  <button onClick={() => update({ options: (field.options || []).filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600 shrink-0">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
            {["radio", "checkbox"].includes(field.type) && (
              <div className="flex items-center justify-between mt-2">
                <span className={propLabelCls + " mb-0"}>Inline layout</span>
                <button onClick={() => update({ inline: !field.inline })}
                  className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${field.inline ? "bg-[#0d2b5e]" : "bg-slate-200"}`}>
                  <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform mt-0.5 ${field.inline ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Date type */}
        {field.type === "datetime" && (
          <div>
            <label className={propLabelCls}>Date Type</label>
            <select className={propInputCls} value={field.dateType || "date"} onChange={e => update({ dateType: e.target.value as FormField["dateType"] })}>
              <option value="date">Date</option>
              <option value="time">Time</option>
              <option value="datetime-local">Date & Time</option>
            </select>
          </div>
        )}

        {/* Signature height */}
        {field.type === "signature" && (
          <div>
            <label className={propLabelCls}>Height (px)</label>
            <input type="number" min={60} max={300} className={propInputCls} value={field.signatureHeight || 120} onChange={e => update({ signatureHeight: Number(e.target.value) })} />
          </div>
        )}

        {/* Button properties */}
        {field.type === "button" && (
          <>
            <div>
              <label className={propLabelCls}>Button Label</label>
              <input className={propInputCls} value={field.buttonLabel || "Submit"} onChange={e => update({ buttonLabel: e.target.value })} />
            </div>
            <div>
              <label className={propLabelCls}>Style</label>
              <select className={propInputCls} value={field.buttonStyle || "primary"} onChange={e => update({ buttonStyle: e.target.value as FormField["buttonStyle"] })}>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="danger">Danger</option>
              </select>
            </div>
          </>
        )}

        {/* Panel properties */}
        {field.type === "panel" && (
          <>
            <div>
              <label className={propLabelCls}>Panel Title</label>
              <input className={propInputCls} value={field.panelTitle || ""} onChange={e => update({ panelTitle: e.target.value })} />
            </div>
            <div className="flex items-center justify-between">
              <span className={propLabelCls + " mb-0"}>Collapsible</span>
              <button onClick={() => update({ collapsible: !field.collapsible })}
                className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${field.collapsible ? "bg-[#0d2b5e]" : "bg-slate-200"}`}>
                <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform mt-0.5 ${field.collapsible ? "translate-x-4" : "translate-x-0.5"}`} />
              </button>
            </div>
          </>
        )}

        {/* Columns */}
        {field.type === "columns" && (
          <div>
            <label className={propLabelCls}>Number of Columns</label>
            <select className={propInputCls} value={field.columnCount || 2} onChange={e => update({ columnCount: Number(e.target.value) as FormField["columnCount"] })}>
              <option value={2}>2 Columns</option>
              <option value={3}>3 Columns</option>
              <option value={4}>4 Columns</option>
            </select>
          </div>
        )}

        {/* Tab labels */}
        {field.type === "tab" && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={propLabelCls + " mb-0"}>Tabs</label>
              <button onClick={() => update({ tabs: [...(field.tabs || []), { label: `Tab ${(field.tabs || []).length + 1}`, id: `t${Date.now()}` }] })}
                className="text-[10px] text-blue-600 hover:text-blue-800 flex items-center gap-0.5"><Plus size={10} /> Add</button>
            </div>
            <div className="space-y-1.5">
              {(field.tabs || []).map((tab, i) => (
                <div key={tab.id} className="flex items-center gap-1.5">
                  <input className={propInputCls} value={tab.label} onChange={e => {
                    const updated = (field.tabs || []).map((t, j) => j === i ? { ...t, label: e.target.value } : t);
                    update({ tabs: updated });
                  }} />
                  {(field.tabs || []).length > 1 && (
                    <button onClick={() => update({ tabs: (field.tabs || []).filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600 shrink-0">
                      <X size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Table headers */}
        {field.type === "table" && (
          <>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={propLabelCls + " mb-0"}>Columns</label>
                <button onClick={() => update({ tableHeaders: [...(field.tableHeaders || []), `Column ${(field.tableHeaders || []).length + 1}`] })}
                  className="text-[10px] text-blue-600 hover:text-blue-800 flex items-center gap-0.5"><Plus size={10} /> Add</button>
              </div>
              <div className="space-y-1.5">
                {(field.tableHeaders || []).map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <input className={propInputCls} value={h} onChange={e => {
                      const updated = (field.tableHeaders || []).map((hh, j) => j === i ? e.target.value : hh);
                      update({ tableHeaders: updated });
                    }} />
                    {(field.tableHeaders || []).length > 1 && (
                      <button onClick={() => update({ tableHeaders: (field.tableHeaders || []).filter((_, j) => j !== i) })} className="text-red-400 hover:text-red-600 shrink-0">
                        <X size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={propLabelCls + " mb-0"}>Allow Add Row</span>
              <button onClick={() => update({ allowAddRow: !field.allowAddRow })}
                className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${field.allowAddRow ? "bg-[#0d2b5e]" : "bg-slate-200"}`}>
                <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform mt-0.5 ${field.allowAddRow ? "translate-x-4" : "translate-x-0.5"}`} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── QC Form List Screen ──────────────────────────────────────────────────────

function QCFormList({
  templates,
  onNew,
  onEdit,
  onDelete,
}: {
  templates: FormTemplate[];
  onNew: () => void;
  onEdit: (t: FormTemplate) => void;
  onDelete: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [filterWorkshop, setFilterWorkshop] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState<FormTemplate | null>(null);

  const filtered = templates.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.formId.toLowerCase().includes(search.toLowerCase());
    const matchWorkshop = filterWorkshop === "All" || t.workshop === filterWorkshop;
    const matchStatus = filterStatus === "All" || t.status === filterStatus;
    return matchSearch && matchWorkshop && matchStatus;
  });

  const statusBadge = (s: FormStatus) => {
    if (s === "active")   return <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">Active</span>;
    if (s === "draft")    return <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold">Draft</span>;
    return <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-semibold">Archived</span>;
  };

  const stats = {
    total: templates.length,
    active: templates.filter(t => t.status === "active").length,
    draft: templates.filter(t => t.status === "draft").length,
    archived: templates.filter(t => t.status === "archived").length,
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar title="Form Builder" subtitle="Template Management" />

      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Forms", value: stats.total, color: "text-[#0d2b5e]" },
            { label: "Active", value: stats.active, color: "text-green-600" },
            { label: "Draft", value: stats.draft, color: "text-amber-600" },
            { label: "Archived", value: stats.archived, color: "text-slate-500" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-border">
          <div className="px-5 py-3.5 border-b border-border flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="relative flex-1 max-w-xs">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  className="w-full text-sm pl-8 pr-3 py-1.5 border border-border rounded-lg outline-none focus:border-blue-400 transition-colors"
                  placeholder="Search by name or ID..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <select
                className="text-sm border border-border rounded-lg px-2.5 py-1.5 outline-none focus:border-blue-400 bg-white text-foreground"
                value={filterWorkshop}
                onChange={e => setFilterWorkshop(e.target.value)}
              >
                <option>All</option>
                {WORKSHOPS.map(w => <option key={w}>{w}</option>)}
              </select>
              <select
                className="text-sm border border-border rounded-lg px-2.5 py-1.5 outline-none focus:border-blue-400 bg-white text-foreground"
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
              >
                <option>All</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <button
              onClick={onNew}
              className="flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-lg text-white bg-[#0d2b5e] hover:bg-[#1a3d7a] transition-colors"
            >
              <Plus size={14} /> New Form
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-border">
                <tr>
                  {["Form ID", "Name", "Workshop", "Products", "Fields", "Status", "Updated", ""].map(h => (
                    <th key={h} className="text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="text-center py-10 text-sm text-muted-foreground">No forms found</td></tr>
                )}
                {filtered.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">{t.formId}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-foreground">{t.name}</p>
                      {t.description && <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{t.description}</p>}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">{t.workshop}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {t.products.slice(0, 2).map(p => (
                          <span key={p} className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">{p}</span>
                        ))}
                        {t.products.length > 2 && <span className="text-[10px] text-muted-foreground">+{t.products.length - 2}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-foreground">{t.fields.length}</td>
                    <td className="px-4 py-3">{statusBadge(t.status)}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{t.updatedDate}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => onEdit(t)} className="p-1.5 rounded hover:bg-blue-50 text-blue-600 transition-colors"><Pencil size={13} /></button>
                        <button onClick={() => setDeleteTarget(t)} className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete confirm modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 size={18} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Delete Form</h3>
                <p className="text-xs text-muted-foreground">{deleteTarget.formId}</p>
              </div>
            </div>
            <p className="text-sm text-foreground mb-4">
              Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setDeleteTarget(null)} className="text-sm px-4 py-2 rounded-lg border border-border hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={() => { onDelete(deleteTarget.id); setDeleteTarget(null); }} className="text-sm px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── QC Form Builder Screen ───────────────────────────────────────────────────

function QCFormBuilder({
  template,
  onBack,
  onSave,
}: {
  template: FormTemplate | null;
  onBack: () => void;
  onSave: (t: FormTemplate) => void;
}) {
  const isNew = !template;
  const [name, setName] = useState(template?.name ?? "");
  const [description, setDescription] = useState(template?.description ?? "");
  const [workshop, setWorkshop] = useState(template?.workshop ?? WORKSHOPS[0]);
  const [products, setProducts] = useState<string[]>(template?.products ?? []);
  const [status, setStatus] = useState<FormStatus>(template?.status ?? "draft");
  const [fields, setFields] = useState<FormField[]>(template?.fields ?? []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showProductDrop, setShowProductDrop] = useState(false);
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const formId = template?.formId ?? generateFormId();
  const dragSource = useRef<{ from: "palette"; type: FieldType } | { from: "canvas"; index: number } | null>(null);

  const selectedField = fields.find(f => f.id === selectedId) ?? null;

  function handleSave() {
    const now = new Date().toISOString().slice(0, 10);
    onSave({
      id: template?.id ?? `ft-${Date.now()}`,
      formId,
      name: name || "Untitled Form",
      description,
      workshop,
      products,
      status,
      fields,
      createdDate: template?.createdDate ?? now,
      updatedDate: now,
    });
  }

  function handlePublish() {
    setStatus("active");
    const now = new Date().toISOString().slice(0, 10);
    onSave({
      id: template?.id ?? `ft-${Date.now()}`,
      formId,
      name: name || "Untitled Form",
      description,
      workshop,
      products,
      status: "active",
      fields,
      createdDate: template?.createdDate ?? now,
      updatedDate: now,
    });
  }

  function addField(type: FieldType) {
    const f = createField(type);
    setFields(prev => [...prev, f]);
    setSelectedId(f.id);
  }

  function updateField(updated: FormField) {
    setFields(prev => prev.map(f => f.id === updated.id ? updated : f));
  }

  function deleteField(id: string) {
    setFields(prev => prev.filter(f => f.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function moveField(from: number, to: number) {
    setFields(prev => {
      const arr = [...prev];
      const [removed] = arr.splice(from, 1);
      arr.splice(to, 0, removed);
      return arr;
    });
  }

  function duplicateField(index: number) {
    const f = fields[index];
    const duplicateId = `f-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const copy: FormField = {
      ...f,
      id: duplicateId,
      options: f.options ? f.options.map(o => ({ ...o })) : undefined,
      tabs: f.tabs ? f.tabs.map(t => ({ ...t })) : undefined,
      tableHeaders: f.tableHeaders ? [...f.tableHeaders] : undefined,
      cells: f.cells ? f.cells.map(row => row.map(cell => cell.map(nested => ({ ...nested, id: `f-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` })))) : undefined,
    };
    setFields(prev => { const arr = [...prev]; arr.splice(index + 1, 0, copy); return arr; });
    setSelectedId(copy.id);
  }

  // Drag handlers
  function onPaletteDragStart(type: FieldType) { dragSource.current = { from: "palette", type }; }
  function onCanvasDragStart(index: number) { dragSource.current = { from: "canvas", index }; }

  function onCanvasDrop(toIndex: number, targetCell?: { row: number; col: number }) {
    const src = dragSource.current;
    if (!src) return;

    if (src.from === "palette") {
      const f = createField(src.type);
      if (targetCell) {
        setFields(prev => {
          const arr = [...prev];
          const tableField = arr[toIndex];
          if (tableField.type === "table") {
            const headers = tableField.tableHeaders || ["Column 1", "Column 2", "Column 3"];
            const cells = (tableField.cells ?? [headers.map(() => [] as FormField[])]).map(row => row.map(cell => [...cell]));
            cells[targetCell.row][targetCell.col] = [...cells[targetCell.row][targetCell.col], f];
            arr[toIndex] = { ...tableField, cells };
          }
          return arr;
        });
        setSelectedId(f.id);
      } else {
        setFields(prev => { const arr = [...prev]; arr.splice(toIndex, 0, f); return arr; });
        setSelectedId(f.id);
      }
    } else {
      const srcIndex = src.index;
      if (targetCell) {
        let movedFieldId: string | null = null;
        setFields(prev => {
          const arr = [...prev];
          const [removed] = arr.splice(srcIndex, 1);
          movedFieldId = removed.id;
          const targetIndex = toIndex > srcIndex ? toIndex - 1 : toIndex;
          const tableField = arr[targetIndex];
          if (tableField.type === "table") {
            const headers = tableField.tableHeaders || ["Column 1", "Column 2", "Column 3"];
            const cells = (tableField.cells ?? [headers.map(() => [] as FormField[])]).map(row => row.map(cell => [...cell]));
            cells[targetCell.row][targetCell.col] = [...cells[targetCell.row][targetCell.col], removed];
            arr[targetIndex] = { ...tableField, cells };
          }
          return arr;
        });
        setSelectedId(movedFieldId);
      } else {
        if (srcIndex !== toIndex) moveField(srcIndex, toIndex);
      }
    }

    dragSource.current = null;
    setDragOver(null);
  }

  function onCanvasDropEnd() {
    const src = dragSource.current;
    if (!src) return;
    if (src.from === "palette") {
      addField(src.type);
    }
    dragSource.current = null;
    setDragOver(null);
  }

  const widthCls = (w?: "full" | "half" | "third") =>
    w === "half" ? "col-span-1" : w === "third" ? "col-span-1" : "col-span-2";

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-border px-5 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-bold text-sm text-foreground truncate">{name || (isNew ? "New Form" : "Untitled Form")}</h1>
          <p className="text-[11px] text-muted-foreground">{formId}</p>
        </div>
        <div className="flex items-center gap-2">
          {status !== "active" && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold">Draft</span>
          )}
          {status === "active" && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">Active</span>
          )}
          <button onClick={() => setPreviewOpen(true)} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-border hover:bg-slate-50 transition-colors font-medium">
            <Eye size={13} /> Preview
          </button>
          <button onClick={handleSave} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-border hover:bg-slate-50 transition-colors font-medium">
            <Save size={13} /> Save Draft
          </button>
          <button onClick={handlePublish} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-[#0d2b5e] text-white hover:bg-[#1a3d7a] transition-colors font-semibold">
            <CheckCircle2 size={13} /> Publish
          </button>
        </div>
      </div>

      {/* Body: palette | canvas | properties */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left palette */}
        <div className="w-56 flex-shrink-0 border-r border-border bg-slate-50 overflow-y-auto">
          <div className="p-3 space-y-4">

            {/* Form info collapsible */}
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              <button onClick={() => setInfoExpanded(!infoExpanded)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-[11px] font-semibold text-slate-700 uppercase tracking-wide">
                Form Info {infoExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
              {infoExpanded && (
                <div className="px-3 pb-3 space-y-2.5 border-t border-border">
                  <div className="pt-2">
                    <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Name</label>
                    <input className="w-full text-xs border border-border rounded px-2 py-1.5 outline-none focus:border-blue-400 bg-white" value={name} onChange={e => setName(e.target.value)} placeholder="Form name..." />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Workshop</label>
                    <select className="w-full text-xs border border-border rounded px-2 py-1.5 outline-none focus:border-blue-400 bg-white" value={workshop} onChange={e => setWorkshop(e.target.value)}>
                      {WORKSHOPS.map(w => <option key={w}>{w}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Products</label>
                    <div className="relative">
                      <button onClick={() => setShowProductDrop(!showProductDrop)}
                        className="w-full text-xs border border-border rounded px-2 py-1.5 outline-none bg-white text-left flex items-center justify-between">
                        <span className="text-muted-foreground truncate">{products.length === 0 ? "Select..." : `${products.length} selected`}</span>
                        <ChevronDown size={10} />
                      </button>
                      {showProductDrop && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded shadow-lg z-20 max-h-40 overflow-y-auto">
                          {ALL_PRODUCTS.map(p => (
                            <label key={p} className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-50 cursor-pointer text-[11px]">
                              <input type="checkbox" checked={products.includes(p)} onChange={e => {
                                setProducts(prev => e.target.checked ? [...prev, p] : prev.filter(x => x !== p));
                              }} />
                              {p}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                    {products.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {products.map(p => (
                          <span key={p} className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            {p.length > 12 ? p.slice(0, 12) + "…" : p}
                            <button onClick={() => setProducts(prev => prev.filter(x => x !== p))}><X size={8} /></button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide block mb-1">Description</label>
                    <textarea className="w-full text-xs border border-border rounded px-2 py-1.5 outline-none focus:border-blue-400 bg-white resize-none" rows={2} value={description} onChange={e => setDescription(e.target.value)} placeholder="Optional description..." />
                  </div>
                </div>
              )}
            </div>

            {/* Basic fields palette */}
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-1">Basic Fields</p>
              <div className="space-y-1">
                {PALETTE_BASIC.map(item => (
                  <div key={item.type}
                    draggable
                    onDragStart={() => onPaletteDragStart(item.type)}
                    onClick={() => addField(item.type)}
                    className="flex items-center gap-2 px-2.5 py-2 bg-white border border-border rounded-lg text-xs font-medium text-slate-700 cursor-grab active:cursor-grabbing hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-colors select-none"
                  >
                    <span className="text-slate-400">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Layout palette */}
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-1">Layout</p>
              <div className="space-y-1">
                {PALETTE_LAYOUT.map(item => (
                  <div key={item.type}
                    draggable
                    onDragStart={() => onPaletteDragStart(item.type)}
                    onClick={() => addField(item.type)}
                    className="flex items-center gap-2 px-2.5 py-2 bg-white border border-border rounded-lg text-xs font-medium text-slate-700 cursor-grab active:cursor-grabbing hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 transition-colors select-none"
                  >
                    <span className="text-slate-400">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto bg-slate-100 p-5"
          onDragOver={e => { e.preventDefault(); }}
          onDrop={e => { e.preventDefault(); onCanvasDropEnd(); }}
        >
          {/* Form preview header */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#0d2b5e] text-white rounded-t-xl px-6 py-4">
              <h2 className="font-bold text-base">{name || "Untitled Form"}</h2>
              <p className="text-xs text-blue-200 mt-0.5">{workshop} · {formId}</p>
            </div>

            {/* Drop zone when empty */}
            {fields.length === 0 && (
              <div className="bg-white border-2 border-dashed border-slate-300 rounded-b-xl px-6 py-16 text-center"
                onDragOver={e => { e.preventDefault(); setDragOver(-1); }}
                onDrop={e => { e.preventDefault(); onCanvasDropEnd(); setDragOver(null); }}
              >
                <Layout size={32} className="text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-400">Drag fields here to start building</p>
                <p className="text-xs text-slate-400 mt-1">Or click any element from the left panel</p>
              </div>
            )}

            {/* Fields canvas */}
            {fields.length > 0 && (
              <div className="bg-white rounded-b-xl shadow-sm overflow-hidden">
                <div className="p-5 grid grid-cols-2 gap-4">
                  {fields.map((field, index) => (
                    <div key={field.id}
                      className={`relative group ${widthCls(field.width)} ${dragOver === index ? "ring-2 ring-blue-400 rounded-lg" : ""}`}
                      onDragOver={e => { e.preventDefault(); e.stopPropagation(); setDragOver(index); }}
                      onDrop={e => { e.preventDefault(); e.stopPropagation(); onCanvasDrop(index); }}
                    >
                      {/* Field card */}
                      <div
                        onClick={() => setSelectedId(selectedId === field.id ? null : field.id)}
                        className={`border rounded-lg p-3 cursor-pointer transition-all ${selectedId === field.id ? "border-blue-500 bg-blue-50 shadow-sm" : "border-border bg-white hover:border-slate-300 hover:bg-slate-50"}`}
                      >
                        {/* Drag handle + actions */}
                        <div className="absolute top-1.5 right-1.5 hidden group-hover:flex items-center gap-0.5 bg-white border border-border rounded shadow-sm z-10 px-0.5">
                          <button
                            draggable
                            onDragStart={e => { e.stopPropagation(); onCanvasDragStart(index); }}
                            className="p-1 text-slate-400 hover:text-slate-700 cursor-grab"
                            title="Drag to reorder"
                          ><GripVertical size={11} /></button>
                          <button onClick={e => { e.stopPropagation(); moveField(index, Math.max(0, index - 1)); }} className="p-1 text-slate-400 hover:text-slate-700" title="Move up"><ChevronUp size={11} /></button>
                          <button onClick={e => { e.stopPropagation(); moveField(index, Math.min(fields.length - 1, index + 1)); }} className="p-1 text-slate-400 hover:text-slate-700" title="Move down"><ChevronDown size={11} /></button>
                          <button onClick={e => { e.stopPropagation(); duplicateField(index); }} className="p-1 text-slate-400 hover:text-blue-600" title="Duplicate"><Copy size={11} /></button>
                          <button onClick={e => { e.stopPropagation(); deleteField(field.id); }} className="p-1 text-slate-400 hover:text-red-500" title="Delete"><Trash2 size={11} /></button>
                        </div>

                        {/* Field type badge */}
                        <div className="mb-2">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${fieldTypeBadgeColor(field.type)}`}>{fieldTypeLabel(field.type)}</span>
                        </div>

                        <FieldPreview field={field} onTableCellDrop={(tableField, row, col) => onCanvasDrop(index, { row, col })} />
                      </div>
                    </div>
                  ))}

                  {/* Drop target at end */}
                  <div className={`col-span-2 border-2 border-dashed rounded-lg py-3 text-center text-xs text-slate-400 transition-colors ${dragOver === fields.length ? "border-blue-400 bg-blue-50" : "border-slate-200"}`}
                    onDragOver={e => { e.preventDefault(); setDragOver(fields.length); }}
                    onDrop={e => { e.preventDefault(); onCanvasDrop(fields.length); }}
                  >
                    Drop here to add at end
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right properties panel */}
        <div className="w-60 flex-shrink-0 border-l border-border bg-white overflow-hidden flex flex-col">
          {selectedField ? (
            <PropertiesPanel
              field={selectedField}
              onChange={updateField}
              onDelete={() => deleteField(selectedField.id)}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
                <Settings size={20} className="text-slate-400" />
              </div>
              <p className="text-xs font-semibold text-slate-500">No field selected</p>
              <p className="text-[11px] text-muted-foreground mt-1">Click a field on the canvas to edit its properties</p>
            </div>
          )}
        </div>
      </div>
    </div>

    {previewOpen && (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-6 overflow-auto">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h3 className="font-semibold text-sm text-foreground">Form Preview</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">{name || "Untitled Form"}</p>
            </div>
            <button onClick={() => setPreviewOpen(false)} className="text-slate-500 hover:text-slate-900">
              <X size={18} />
            </button>
          </div>
          <div className="max-h-[80vh] overflow-y-auto p-5 bg-slate-50 space-y-4">
            {fields.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
                Add fields to preview the form structure.
              </div>
            ) : (
              fields.map(field => (
                <div key={field.id} className="rounded-2xl border border-border bg-white p-4">
                  <FieldPreview field={field} />
                </div>
              ))
            )}
          </div>
          <div className="flex justify-end px-5 py-4 border-t border-border">
            <button onClick={() => setPreviewOpen(false)} className="text-sm px-4 py-2 rounded-lg border border-border bg-white hover:bg-slate-50 transition-colors">
              Close Preview
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [account, setAccount] = useState<Account | null>(null);
  const [screen, setScreen] = useState<Screen>("worker-dashboard");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [isNewJob, setIsNewJob] = useState(false);
  const [formTemplates, setFormTemplates] = useState<FormTemplate[]>(INITIAL_FORM_TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState<FormTemplate | null>(null);

  function handleLogin(acc: Account) {
    setAccount(acc);
    if (acc.role === "worker") setScreen("worker-dashboard");
    else if (acc.role === "qc") setScreen("qc-dashboard");
    else if (acc.role === "pe") setScreen("pe-dashboard");
    else setScreen("pe-dashboard"); // admin starts at PE dashboard
  }

  function handleLogout() {
    setAccount(null);
    setSelectedTask(null);
    setSelectedJob(null);
  }

  function handleSelectWorkerTask(task: Task) {
    setSelectedTask(task);
    setScreen("worker-task-detail");
  }

  function handleSelectQCTask(task: Task) {
    setSelectedTask(task);
    setScreen("qc-task-detail");
  }

  function handleInspect() {
    setScreen("qc-inspection");
  }

  function handleInspectionComplete(approved: boolean) {
    if (selectedTask) {
      setSelectedTask({ ...selectedTask, status: approved ? "done" : "awaiting-rework" });
    }
    setScreen("qc-dashboard");
  }

  function handleSelectJob(job: Job) {
    setSelectedJob(job);
    setIsNewJob(false);
    setScreen("pe-job-detail");
  }

  function handleCreateJob() {
    setSelectedJob(null);
    setIsNewJob(true);
    setScreen("pe-job-detail");
  }

  function handleSaveJob(job: Job) {
    setJobs((prev) => {
      const exists = prev.find((j) => j.id === job.id);
      if (exists) return prev.map((j) => j.id === job.id ? job : j);
      return [job, ...prev];
    });
    setSelectedJob(job);
    setIsNewJob(false);
  }

  function handleDeleteJob(id: string) {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }

  function handleNewTemplate() {
    setSelectedTemplate(null);
    setScreen("qc-form-builder");
  }

  function handleEditTemplate(t: FormTemplate) {
    setSelectedTemplate(t);
    setScreen("qc-form-builder");
  }

  function handleDeleteTemplate(id: string) {
    setFormTemplates(prev => prev.filter(t => t.id !== id));
  }

  function handleSaveTemplate(t: FormTemplate) {
    setFormTemplates(prev => {
      const exists = prev.find(x => x.id === t.id);
      if (exists) return prev.map(x => x.id === t.id ? t : x);
      return [t, ...prev];
    });
    setSelectedTemplate(t);
    setScreen("qc-form-list");
  }

  // Show login if not authenticated
  if (!account) {
    return (
      <div style={{ fontFamily: "'Manrope', sans-serif" }}>
        <LoginScreen onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background" style={{ fontFamily: "'Manrope', sans-serif" }}>
      <style>{`
        .form-input {
          width: 100%;
          font-size: 0.875rem;
          border: 1px solid hsl(var(--border));
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          outline: none;
          background: white;
          color: hsl(var(--foreground));
          transition: border-color 0.15s;
        }
        .form-input:focus { border-color: #3b82f6; }
        .form-input.font-mono { font-family: monospace; }
      `}</style>

      <Sidebar account={account} screen={screen} onNavigate={setScreen} onLogout={handleLogout} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {screen === "worker-dashboard" && (
          <WorkerDashboard onSelectTask={handleSelectWorkerTask} />
        )}
        {screen === "worker-task-detail" && selectedTask && (
          <WorkerTaskDetail task={selectedTask} onBack={() => setScreen("worker-dashboard")} />
        )}
        {screen === "worker-task-detail" && !selectedTask && (
          <WorkerDashboard onSelectTask={handleSelectWorkerTask} />
        )}

        {screen === "qc-dashboard" && (
          <QCDashboard onSelectTask={handleSelectQCTask} />
        )}
        {screen === "qc-task-detail" && selectedTask && (
          <QCTaskDetail task={selectedTask} onBack={() => setScreen("qc-dashboard")} onInspect={handleInspect} />
        )}
        {screen === "qc-task-detail" && !selectedTask && (
          <QCDashboard onSelectTask={handleSelectQCTask} />
        )}
        {screen === "qc-inspection" && selectedTask && (
          <QCInspectionForm task={selectedTask} onBack={() => setScreen("qc-task-detail")} onComplete={handleInspectionComplete} />
        )}
        {screen === "qc-form-list" && (
          <QCFormList
            templates={formTemplates}
            onNew={handleNewTemplate}
            onEdit={handleEditTemplate}
            onDelete={handleDeleteTemplate}
          />
        )}
        {screen === "qc-form-builder" && (
          <QCFormBuilder
            template={selectedTemplate}
            onBack={() => setScreen("qc-form-list")}
            onSave={handleSaveTemplate}
          />
        )}

        {screen === "pe-dashboard" && (
          <PEDashboard jobs={jobs} onSelectJob={handleSelectJob} onCreateJob={handleCreateJob} />
        )}
        {screen === "pe-job-detail" && (
          <PEJobDetail
            job={isNewJob ? null : selectedJob}
            onBack={() => setScreen("pe-dashboard")}
            onSave={handleSaveJob}
            onDelete={handleDeleteJob}
          />
        )}
      </main>
    </div>
  );
}
