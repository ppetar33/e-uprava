export interface CommunalProblem {
    id: string;
    title: string;
    description: string;
    address: string;
    imageUrl: string;
    reportedById: string;
    report: string;
    policemanId: string;
    judgeId:string;
    anonymous: boolean;
    date: string;
    municipality: string;
    accepted: boolean;
    sent: boolean;
    solved: boolean;
    improvement: string;
    hearing: string;
    dateHearing: string;
}