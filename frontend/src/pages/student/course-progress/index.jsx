import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/Student-context";
import { getCurrentCourseProgressService, markLectureAsViewedService, resetCourseProgressService } from "@/services";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { Check, ChevronLeft, ChevronRight, ClockFading, Play } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";

const StudentViewCourseProgressPage = () => {
    const [lockCourse, setLockCourse] = useState(false);
    const [currentLecture, setCurrentLecture] = useState(null);
    const [showCourseCompleteDialog, setShowCourseCompleteDialog] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
    console.log("lock course", lockCourse);

    const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } = useContext(StudentContext);
    const { auth } = useContext(AuthContext);
    const { id } = useParams();
    console.log("currentLecture", currentLecture);

    const fetchCurrentCourseProgress = async () => {
       const response = await getCurrentCourseProgressService(auth?.user?._id, id);
    if (response?.success) {
      if (!response?.data?.isPurchased) {
        setLockCourse(true);
      } else {
        setStudentCurrentCourseProgress({
          courseDetails: response?.data?.courseDetails,
          progress: response?.data?.progress,
        });

        if (response?.data?.completed) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
          setShowCourseCompleteDialog(true);
          setShowConfetti(true);

          return;
        }

        if (response?.data?.progress?.length === 0) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
        } else {
          console.log("logging here");
          const lastIndexOfViewedAsTrue = response?.data?.progress.reduceRight(
            (acc, obj, index) => {
              return acc === -1 && obj.viewed ? index : acc;
            },
            -1
          );

          setCurrentLecture(
            response?.data?.courseDetails?.curriculum[
              lastIndexOfViewedAsTrue + 1
            ]
          );
        }
      }
    }
    };


    const updateCourseProgress=async()=>{
        if(currentLecture){
            const response=await markLectureAsViewedService(auth?.user?._id,studentCurrentCourseProgress?.courseDetails?._id,currentLecture._id)
            console.log("markLectureAsViewedService",response)
            if(response?.success){
                fetchCurrentCourseProgress()
            }
        }
    }

    const handleReWatchCourse=async()=>{
        const response=await resetCourseProgressService(auth?.user?._id,studentCurrentCourseProgress?.courseDetails?._id)
        if(response?.success){
            setCurrentLecture(null)
            setShowConfetti(false)
            setShowCourseCompleteDialog(false)
            fetchCurrentCourseProgress()
        }

    }





    useEffect(() => {
        fetchCurrentCourseProgress();
    }, [id]);

    useEffect(() => {
        if (showConfetti)
            setTimeout(() => {
                setShowConfetti(false);
            }, 15000);
    }, []);

useEffect(() => {
    console.log("currentLecture",currentLecture)
if(currentLecture?.progressValue===1)
    updateCourseProgress()
 
}, [currentLecture])





    return (
        <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
            {showConfetti && <Confetti />}

            <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700">
                <div className="flex items-center space-x-4">
                    <Button onClick={() => navigate("/student-courses")} className="text-white" variant="ghost" size="sm">
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back to My Courses Page
                    </Button>
                    <h1 className="text-lg font-bold hidden md:block">
                        {studentCurrentCourseProgress?.courseDetails?.title}
                    </h1>
                </div>
                <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </Button>
            </div>
            <div className="flex flex-1 overflow-hidden">
                <div className={`flex-1 ${isSidebarOpen ? "mr-[400px]" : ""} transition-all duration-300`}>
                    <VideoPlayer 
                    url={currentLecture?.videoUrl}
                     width="100%" height="500px" 
                     onProgressUpdate={setCurrentLecture}
                     progressData={currentLecture}
                     />


                    <div className="p-6 bg-[#1c1d1f]">
                        <h2 className="text-2xl font-bold mb-2">{currentLecture?.title}</h2>
                    </div>
                </div>
                <div
                    className={`fixed top-[64px] right-0 bottom-0 w-[400px] bg-[#1c1d1f] border-1
                     border-gray-700 transition-all duration-300 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                    <Tabs defaultValue="content" className="h-full flex flex-col">
                        <TabsList className="grid bg-white w-full grid-cols-2 p-0 h-14">
                            <TabsTrigger value="content" className=" text-black rounded-none h-full">
                                CourseContent
                            </TabsTrigger>
                            <TabsTrigger value="overview" className=" text-black rounded-none h-full">
                                Overview
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="content">
                            <ScrollArea className="h-full">
                                <div className="p-4 space-y-4">
                                    {studentCurrentCourseProgress?.courseDetails?.curriculum.map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex items-center space-x-2 text-sm text-white font-bold cursor-pointer"
                                        >
                                            {
                                                studentCurrentCourseProgress?.progress?.find(progressItem=>progressItem.lectureId===item._id)?.viewed?
                                                <Check className="h-4 w-4 text-green-500"/>:
                                                <Play className="h-4 w-4"/>
                                            }



                                            <span>{item?.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="overview" className="flex-1 overflow-hidden">
                            <ScrollArea className="h-full">
                                <div className="p-4">
                                    <h2 className="text-xl font-bold mb-4">About this course</h2>
                                    <p className="text-gray-400">
                                        {studentCurrentCourseProgress?.courseDetails?.description}
                                    </p>
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <Dialog open={lockCourse}>
                <DialogContent className="sm:w-[425px]">
                    <DialogHeader>
                        <DialogTitle>You can't view this page</DialogTitle>
                        <DialogDescription>Please purchase this course to get access</DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Dialog open={showCourseCompleteDialog}>
                <DialogContent showOverlay={false} className="sm:w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Congratulations!</DialogTitle>
                        <DialogDescription className="flex flex-col gap-3">
                            <Label>You have completed the course</Label>
                            <div className="flex flex-row gap-3">
                                <Button onClick={()=>navigate("/student-courses")}>My Courses Page</Button>
                                <Button onClick={handleReWatchCourse}>Rewatch Course</Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default StudentViewCourseProgressPage;


