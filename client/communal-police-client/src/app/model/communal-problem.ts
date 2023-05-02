export interface CommunalProblem {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    address: string;
    reportedById: string;
    policemanId: string;
    reportId: string;
    judgeId: string;
    anonymus: boolean;
    municipality: string
    date: string;
}