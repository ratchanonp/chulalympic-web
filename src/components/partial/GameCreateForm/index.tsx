import { CreateGame } from "@/interfaces/game.interface";
import { useGetFacultiesQuery } from "@/services/faculty";
import { useCreateGameMutation } from "@/services/games";
import { useGetSportsQuery, useLazyGetSportCategoriesQuery } from "@/services/sport";
import { useGetVenuesQuery } from "@/services/venue";
import { GAME_STATUS, MEDAL_TYPE, ROUND_TYPE, SCORE_TYPE } from "@/utils/constant/game";
import { Button, FormControl, FormLabel, Grid, Heading, Icon, Input, Radio, RadioGroup, Select, Stack, Textarea, useToast } from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { AiTwotoneSave } from "react-icons/ai";
import { BiAddToQueue, BiMedal } from "react-icons/bi";
import {
    BsFillCalendarEventFill,
    BsFillPeopleFill
} from "react-icons/bs";
import { GrNotes, GrStatusInfo } from "react-icons/gr";
import { HiLibrary } from "react-icons/hi";
import { ImSortNumbericDesc } from "react-icons/im";
import { IoLocationSharp } from "react-icons/io5";
import { MdDeleteForever, MdOutlineScore, MdOutlineSportsHandball } from "react-icons/md";

export default function GameCreateForm() {

    const { data: Sports, isLoading: isSportLoading } = useGetSportsQuery();
    const { data: Venues, isLoading: isVenueLoading } = useGetVenuesQuery();
    const { data: Faculties, isLoading: isFacultyLoading } = useGetFacultiesQuery();
    const [trigger, { data: SportCategory, isLoading: isSportCategoryLoading }] = useLazyGetSportCategoriesQuery();

    const router = useRouter();

    const toast = useToast();
    const [createGame] = useCreateGameMutation();

    const initialValues = {
        sportCode: "",
        sportCategoryCode: "",
        start: "",
        venueId: -1,
        status: "SCHEDULED",
        scoreType: "POINT",
        participant: [
            { facultyId: 0, value: 0, medal: "" },
        ],
        note: "",
        type: "REGULAR",
    }

    async function handleSubmit(value: CreateGame) {
        try {
            const res = await createGame(value).unwrap();
            toast({
                title: `เพิ่ม ${res.id} แล้ว`,
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values, { resetForm }) => {

                const data: CreateGame = {
                    venueId: Number(values.venueId),
                    sportCode: values.sportCode,
                    sportCategoryCode: values.sportCategoryCode,
                    start: values.start ? new Date(values.start).toISOString() : "",
                    type: values.type,
                    status: values.status,
                    participants: values.participant && values.participant.map(participant => ({
                        facultyId: Number(participant.facultyId ? participant.facultyId : 0),
                        scoreType: values.scoreType,
                        value: Number(participant.value ? participant.value : 0),
                        medal: participant.medal ? participant.medal : null
                    })),
                    note: values.note
                }

                // console.log(data);s
                await handleSubmit(data);
                resetForm();
            }}
        >
            {({ values, handleChange, isSubmitting, handleSubmit, setFieldValue }) => (
                <Form>
                    <Stack spacing={5}>
                        <Stack direction={["column", "row"]} spacing={5}>
                            <FormControl>
                                <FormLabel fontWeight="semibold"><Icon as={MdOutlineSportsHandball} mr={1} />กีฬา </FormLabel>
                                <Select id="sportCode" onChange={(e) => {
                                    handleChange(e);
                                    trigger(e.currentTarget.value);
                                }} required value={values.sportCode}>
                                    <option value="" disabled>เลือกกีฬา</option>
                                    {Sports && Sports.map(sport => (
                                        <option key={sport.code} value={sport.code}>{sport.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="semibold"><Icon as={MdOutlineSportsHandball} mr={1} />ประเภทกีฬา </FormLabel>
                                <Select id="sportCategoryCode" onChange={handleChange} required value={values.sportCategoryCode}>
                                    <option value="" disabled>เลือกประเภทกีฬา</option>
                                    {SportCategory && SportCategory.map(sportCategory => (
                                        <option key={sportCategory.code} value={sportCategory.code}>{sportCategory.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack direction={["column", "row"]} spacing={5}>
                            <FormControl>
                                <FormLabel fontWeight="semibold"><Icon as={BsFillCalendarEventFill} mr={1} />วันที่แข่ง</FormLabel>
                                <Input id="start" onChange={handleChange} type="datetime-local" required value={values.start} />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="semibold"><Icon as={IoLocationSharp} mr={1} />สถานที่แข่ง</FormLabel>
                                <Select id="venueId" onChange={handleChange} required value={values.venueId}>
                                    <option value={-1} disabled>เลือกสถานที่แข่ง</option>
                                    {Venues && Venues.map(venue => (
                                        <option key={venue.id} value={venue.id}>{venue.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack direction={["column", "row"]} spacing={5}>
                            <FormControl>
                                <FormLabel fontWeight="semibold"><Icon as={MdOutlineSportsHandball} mr={1} />ประเภทการแข่ง</FormLabel>
                                <RadioGroup id="type" name="type" aria-required={true} value={values.type}>
                                    <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={2}>
                                        {ROUND_TYPE.map(roundType => (
                                            <Radio key={roundType.value} value={roundType.value} onChange={handleChange}>{roundType.label}</Radio>
                                        ))}
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="semibold"><Icon as={ImSortNumbericDesc} mr={1} />ประเภทการจัดอันดับ</FormLabel>
                                <RadioGroup id="scoreType" name="scoreType" aria-required={true} defaultValue="POINT">
                                    <Stack direction="row">
                                        {SCORE_TYPE.map(scoreType => (
                                            <Radio key={scoreType.value} value={scoreType.value} onChange={handleChange}>{scoreType.label}</Radio>
                                        ))}
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                        </Stack>

                        <FieldArray name="participant">
                            {({ insert, remove, push }) => (
                                <>
                                    <Stack>
                                        <Heading size="lg" display="flex" alignItems="center">
                                            <Icon as={BsFillPeopleFill} mr={1} />
                                            ผู้เข้าแข่งขัน
                                        </Heading>

                                    </Stack>
                                    <Stack spacing={5}>
                                        {values.participant.length != 0 && values.participant
                                            .map((participant, index) => (
                                                <Stack key={index} spacing={2} direction={["column", "row"]} alignItems="end" bgColor="gray.50" p={5} borderRadius="xl">
                                                    <FormControl>
                                                        <FormLabel fontWeight="semibold" display="flex" alignItems="center">
                                                            <Icon as={HiLibrary} mr={1} />
                                                            คณะ</FormLabel>
                                                        <Select bgColor="white"
                                                            id={`participant.${index}.facultyId`}
                                                            onChange={handleChange}
                                                            required
                                                            value={participant.facultyId}
                                                        >
                                                            <option value="">เลือกคณะ</option>
                                                            {Faculties && Faculties.map(faculty => (
                                                                <option
                                                                    key={faculty.id}
                                                                    value={faculty.id}
                                                                >{faculty.name}</option>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                    <FormControl>
                                                        <FormLabel fontWeight="semibold" display="flex" alignItems="center"><Icon as={MdOutlineScore} mr={1} />{SCORE_TYPE.find(scoreType => scoreType.value === values.scoreType)?.label}</FormLabel>
                                                        <Input bgColor="white"
                                                            id={`participant.${index}.value`}
                                                            type={values.scoreType === "time" ? "time" : "number"}
                                                            value={participant.value}
                                                            onChange={handleChange} required />
                                                    </FormControl>
                                                    <FormControl>
                                                        <FormLabel fontWeight="semibold" display="flex" alignItems="center">
                                                            <Icon as={BiMedal} mr={1} />
                                                            เหรียญ
                                                        </FormLabel>
                                                        <Select bgColor="white"
                                                            id={`participant.${index}.medal`}
                                                            onChange={handleChange}
                                                            value={participant.medal}
                                                        >
                                                            {MEDAL_TYPE.map(medal => (
                                                                <option
                                                                    key={medal.value}
                                                                    value={medal.value}
                                                                >{medal.label}</option>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                    <Button
                                                        colorScheme="red"
                                                        onClick={() => remove(index)}
                                                    >
                                                        <Icon w={5} h={5} as={MdDeleteForever} />
                                                    </Button>
                                                </Stack>
                                            ))}
                                        <Button size="sm" colorScheme="blue" onClick={() => push({ facultyId: "", scoreType: "", value: 0, medal: "" })}>
                                            <Icon as={BiAddToQueue} mr={1} />
                                            เพิ่ม
                                        </Button>
                                    </Stack>
                                </>
                            )}
                        </FieldArray>
                        <FormControl>
                            <FormLabel fontWeight="semibold"><Icon as={GrNotes} mr={1} />หมายเหตุ</FormLabel>
                            <Textarea id="note" onChange={handleChange} value={values.note} />
                        </FormControl>
                        <FormControl>
                            <FormLabel display="flex" alignItems="center" fontWeight="semibold"><Icon as={GrStatusInfo} mr={1} /> สถานะ</FormLabel>
                            <RadioGroup id="status" name="status" onChange={handleChange} value={values.status}>
                                <Stack direction="row">
                                    {GAME_STATUS.map(status => (
                                        <Radio key={status.value} value={status.value} onChange={handleChange} >{status.label}</Radio>
                                    ))}
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                        <Stack>
                            <Button type="submit" colorScheme="green" mt={5} isLoading={isSubmitting} loadingText="กำลังบันทึก"> <Icon as={AiTwotoneSave} mr={1} /> สร้างการแข่งขัน</Button>
                        </Stack>
                    </Stack>
                </Form>
            )
            }

        </Formik >
    )


}