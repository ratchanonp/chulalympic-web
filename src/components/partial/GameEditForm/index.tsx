import { Faculty } from "@/interfaces/faculty.interface";
import { Game, UpdateGame } from "@/interfaces/game.interface";
import { Venue } from "@/interfaces/venue.interface";
import { useUpdateGameMutation } from "@/services/games";
import { GAME_STATUS, MEDAL_TYPE, ROUND_TYPE, SCORE_TYPE } from "@/utils/constant/game";
import { Button, FormControl, FormLabel, Grid, Heading, Icon, Input, Radio, RadioGroup, Select, Stack, Text, Textarea, useToast } from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
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

interface Props {
    gameData: Game
    facultiesData: Faculty[]
    venuesData: Venue[]
    fetchGameData: () => void
}

export default function GameEditForm(props: Props) {

    const router = useRouter();

    const { gameData: data, venuesData: Venues, facultiesData: Faculties, fetchGameData } = props;
    const toast = useToast();
    const [updateGame, result] = useUpdateGameMutation();

    const dateTime = new Date(data.start);
    dateTime.setHours(dateTime.getHours() + 7);

    const sortedParticipant = [...data.participant].sort((a, b) => a.value - b.value * (data.participant[0]?.scoreType == "POINT" ? -1 : 1));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initialValues = {
        id: data.id,
        venueId: data.venue.id,
        sportCode: data.sport.code,
        sportCategoryCode: data.sportCategory.code,
        start: dateTime.toISOString().slice(0, 16),
        type: data.type,
        status: data.status,
        participant: sortedParticipant
            .map(participant => ({
                id: participant.id,
                facultyId: participant.facultyId,
                scoreType: participant.scoreType,
                value: participant.value,
                medal: participant.medal,
                note: participant.note || ""
            })),
        scoreType: data.participant[0]?.scoreType,
        note: data.note
    }

    useEffect(() => {
        console.log(initialValues)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues])

    async function handleSubmit(value: UpdateGame) {
        try {
            const res = await updateGame(value).unwrap();
            console.log(res)
            toast({
                title: "แก้ไขข้อมูลสำเร็จ",
                position: "top",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            fetchGameData();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {

                const data: UpdateGame = {
                    id: values.id,
                    venueId: Number(values.venueId),
                    sportCode: values.sportCode,
                    sportCategoryCode: values.sportCategoryCode,
                    start: new Date(values.start).toISOString(),
                    type: values.type,
                    status: values.status,
                    participants: values.participant
                        .map(participant => ({
                            id: participant.id,
                            facultyId: Number(participant.facultyId),
                            scoreType: values.scoreType,
                            value: Number(participant.value),
                            medal: participant.medal ? participant.medal : null,
                            note: participant.note
                        })),
                    note: values.note
                }

                await handleSubmit(data);
            }}
        >
            {({ values, handleChange, isSubmitting, handleSubmit, setFieldValue }) => (
                <Form>
                    <Stack spacing={5}>
                        <Stack direction={["column", "row"]} spacing={5}>
                            <FormControl>
                                <FormLabel fontWeight="semibold"><Icon as={MdOutlineSportsHandball} mr={1} />กีฬา <Text as="span" color="red" fontSize="xs">(แก้ไขไม่ได้)</Text></FormLabel>
                                <Input disabled value={data.sport.name} />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="semibold"><Icon as={MdOutlineSportsHandball} mr={1} />ประเภทกีฬา <Text as="span" color="red" fontSize="xs">(แก้ไขไม่ได้)</Text></FormLabel>
                                <Input disabled value={data.sportCategory.name} />
                            </FormControl>
                        </Stack>
                        <Stack direction={["column", "row"]} spacing={5}>
                            <FormControl>
                                <FormLabel fontWeight="semibold"><Icon as={BsFillCalendarEventFill} mr={1} />วันที่แข่ง</FormLabel>
                                <Input id="start" onChange={handleChange} type="datetime-local" value={values.start} />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="semibold"><Icon as={IoLocationSharp} mr={1} />สถานที่แข่ง</FormLabel>
                                <Select id="venueId" onChange={handleChange}>
                                    {Venues.map(venue => (
                                        <option key={venue.id} value={venue.id} selected={venue.id === values.venueId}>{venue.name}</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack direction={["column", "row"]} spacing={5}>
                            <FormControl>
                                <FormLabel fontWeight="semibold"><Icon as={MdOutlineSportsHandball} mr={1} />ประเภทการแข่ง</FormLabel>
                                <RadioGroup id="type" name="type" value={values.type}>
                                    <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap={2}>
                                        {ROUND_TYPE.map(roundType => (
                                            <Radio key={roundType.value} id="type" name="type" value={roundType.value} onChange={handleChange}>{roundType.label}</Radio>
                                        ))}
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="semibold"><Icon as={ImSortNumbericDesc} mr={1} />ประเภทการจัดอันดับ</FormLabel>
                                <RadioGroup id="scoreType" name="scoreType" value={values.scoreType}>
                                    <Stack direction="row">
                                        {SCORE_TYPE.map(scoreType => (
                                            <Radio key={scoreType.value} name="scoreType" value={scoreType.value} onChange={handleChange}>{scoreType.label}</Radio>
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
                                        {values.participant
                                            .map((participant, index) => (
                                                <>
                                                    <Stack spacing={2} direction={["column", "row"]} alignItems="end" key={index} bgColor="gray.50" p={5} borderRadius="xl">
                                                        <FormControl>
                                                            <FormLabel fontWeight="semibold" display="flex" alignItems="center">
                                                                <Icon as={HiLibrary} mr={1} />
                                                                คณะ</FormLabel>
                                                            <Select bgColor="white"
                                                                id={`participant.${index}.facultyId`}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="" selected={participant.facultyId === undefined}>เลือกคณะ</option>
                                                                {Faculties.map(faculty => (
                                                                    <option
                                                                        key={faculty.id}
                                                                        value={faculty.id}
                                                                        selected={faculty.id === participant.facultyId}
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
                                                                onChange={handleChange} />
                                                        </FormControl>
                                                        <FormControl>
                                                            <FormLabel fontWeight="semibold" display="flex" alignItems="center">
                                                                <Icon as={BiMedal} mr={1} />
                                                                เหรียญ
                                                            </FormLabel>
                                                            <Select bgColor="white"
                                                                id={`participant.${index}.medal`}
                                                                onChange={handleChange}
                                                            >
                                                                {MEDAL_TYPE.map(medal => (
                                                                    <option
                                                                        key={medal.value}
                                                                        value={medal.value}
                                                                        selected={medal.value === participant.medal}
                                                                    >{medal.label}</option>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl>
                                                            <FormLabel fontWeight="semibold"><Icon as={GrNotes} mr={1} />หมายเหตุ</FormLabel>
                                                            <Input bgColor="white" id={`participant.${index}.note`} onChange={handleChange} value={participant.note} />
                                                        </FormControl>
                                                        <Button
                                                            colorScheme="red"
                                                            onClick={() => remove(index)}
                                                        >
                                                            <Icon w={5} h={5} as={MdDeleteForever} />
                                                        </Button>
                                                    </Stack>

                                                </>
                                            ))}
                                        <Button size="sm" colorScheme="blue" onClick={() => push({ facultyId: "", scoreType: "", value: "", medal: "" })}>
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
                        <Stack >
                            <Button type="submit" colorScheme="green" mt={5} isLoading={isSubmitting} loadingText="กำลังบันทึก"> <Icon as={AiTwotoneSave} mr={1} /> บันทึก</Button>
                        </Stack>
                    </Stack>
                </Form>
            )
            }

        </Formik >
    )


}