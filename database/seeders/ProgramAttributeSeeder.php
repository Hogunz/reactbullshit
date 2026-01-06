<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProgramAttribute;

class ProgramAttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bsitPeos = [
            "Possessed essential and fundamental technological knowledge and skills that make them confident to become as IT Specialist in local, national and international work environment.",
            "Displayed the appropriate morally and ethical behavior of Information Technology professional in and out of the workplace.",
            "Occupied managerial and leadership roles in their organizations.",
            "Engaged in life-long learning through relevant and comprehensive continuous attendance to conferences/seminars/training as resource speakers and as participants.",
            "Pursued graduate program and engage in academic and research careers.",
            "Engaged in an economic enterprise related to the profession.",
            "Acquired global proficiency/competency in communication skills.",
        ];

        $bsitPos = [
            "Apply knowledge of computing, science, and mathematics appropriate to the discipline.",
            "Understand best practices and standards and their applications.",
            "Analyze complex problems, and identify and define the computing requirements appropriate to their solution.",
            "Identify and analyze user needs and take them into account in the selection, creation, evaluation, and administration of computer-based systems.",
            "Design, implement, and evaluate computer-based systems, processes, components, or programs to meet desired needs and requirements under various constraints.",
            "Integrate IT-based solutions into the user environment effectively.",
            "Apply knowledge through the use of current techniques, skills, tools, and practices necessary for the IT profession.",
            "Function effectively as a member or leader of a development team, recognizing the different roles within a team to accomplish a common goal.",
            "Assist in the creation of an effective IT project plan.",
            "Communicate effectively with the computing community and with society at large about complex computing activities through logical writing, presentations, and clear instructions.",
            "Analyze the local and global impact of computing and information technology on individuals, organizations, and society.",
            "Understand professional, ethical, legal, security, and social issues and responsibilities in the utilization of information technology.",
            "Recognize the need for, and engage in, planning self-learning and improving performance as a foundation for continuing professional development.",
        ];

        $bscsPos = [
            "Apply knowledge of computing, science, and mathematics appropriate to the discipline",
            "Understand best practices and standards and their applications",
            "Analyze complex problem and identify and define the computing requirements appropriate to its solution.",
            "Identify an analyze user needs and take them into account in the selection, creation, evaluation and administration of computer-based systems.",
            "Design, implement, and evaluate computer-based systems, processes, components, or programs to meet desired needs and requirement under various constraints",
            "Integrate IT-based solutions into the user environment effectively",
            "Apply knowledge through the use of current techniques, skills, tools and practices necessary for the IT profession",
            "Function effectively as a member or leader of a development team recognizing the different roles within a team to accomplish a common goal",
            "Assist in the creation of an effective IT project plan",
            "Communicate effectively with the computer community and with society at large about complex computing activities through logical writing, presentations, and clear instructions",
            "Analyze the local and global impact of computing information technology on individuals, organizations, and society",
            "Understand professional, ethical, legal, security and social issues and responsibilities in the utilization of information technology",
            "Recognize the need for and engage in planning self-learning and improving performance as a foundation for continuing professional development"
        ];

        // New Attributes from User Request
        $ios = [
            "Meet the standards of both local and global markets",
            "Innovate and contribute to technological advancements and societal development",
            "Uphold social responsibility and ethical values",
            "Demonstrate dynamism, resiliency and integrity as desired of a professional",
            "Exercise leadership grounded competence commitment excellence",
        ];

        $heis = [
            "Articulate and discuss the latest developments in the specific field of practice",
            "Effectively communicate orally and in writing both English and Filipino",
            "Work effectively and independently in multi-disciplinary and multi-cultural teams",
            "Act in recognition of professional, social and ethical responsibility",
            "Preserve and promote Filipino historical and cultural heritage",
        ];

        $pathfits = [
            "Participate in moderate to vigorous physical activities in accordance with national and global recommendations for physical activity and health",
            "Adapt movement competencies to independent physical pursuits that are both health-enhancing and personally rewarding",
            "Monitor progress and evaluate the achievement of personal fitness and dietary goals",
            "Practice empathy and fair play by showing respect for differing abilities through interpersonal communication skills and emotional regulation during physical activity participation",
            "Apply basic tactics in sports game situations",
        ];

        $advocacies = [
            "Devise, assess and apply range of strategies to improve one’s physical activity performance and that of others",
            "Enhance and advocate for personal and others’ fitness, safety and wellness through physical activity participation and/or leadership",
            "Promote practical and creative interventions that foster community connection and contribute to the health and wellness of the school and its surrounding areas.",
        ];

        foreach ($bsitPeos as $peo) {
            ProgramAttribute::create(['program' => 'BSIT', 'type' => 'PEO', 'content' => $peo]);
        }

        foreach ($bsitPos as $po) {
            ProgramAttribute::create(['program' => 'BSIT', 'type' => 'PO', 'content' => $po]);
        }

        foreach ($bscsPos as $po) {
            ProgramAttribute::create(['program' => 'BSCS', 'type' => 'PO', 'content' => $po]);
        }

        foreach ($ios as $item) {
            ProgramAttribute::create(['program' => 'BSIT', 'type' => 'IO', 'content' => $item]);
        }

        foreach ($heis as $item) {
            ProgramAttribute::create(['program' => 'BSIT', 'type' => 'HEI', 'content' => $item]);
        }

        foreach ($pathfits as $item) {
            ProgramAttribute::create(['program' => 'BSIT', 'type' => 'PATHFIT', 'content' => $item]);
        }

        foreach ($advocacies as $item) {
            ProgramAttribute::create(['program' => 'BSIT', 'type' => 'ADVOCACY', 'content' => $item]);
        }
    }
}
