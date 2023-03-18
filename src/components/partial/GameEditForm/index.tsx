import { Faculty } from "@/interfaces/faculty.interface";
import { Game, UpdateGame } from "@/interfaces/game.interface";
import { Venue } from "@/interfaces/venue.interface";
import { useUpdateGameMutation } from "@/services/games";
import { MEDAL_TYPE, ROUND_TYPE, SCORE_TYPE } from "@/utils/constant/game";
import { Button, FormControl, FormLabel, Heading, Icon, Input, Select, Stack, Text, useToast } from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { AiTwotoneSave } from "react-icons/ai";
import { BiAddToQueue, BiMedal } from "react-icons/bi";
import {
    BsFillCalendarEventFill,
    BsFillPeopleFill
} from "react-icons/bs";
import { HiLibrary } from "react-icons/hi";
import { ImSortNumbericDesc } from "react-icons/im";
import { IoLocationSharp } from "react-icons/io5";
import { MdDeleteForever, MdOutlineScore, MdOutlineSportsHandball } from "react-icons/md";

interface Props {
    gameData: Game
    facultiesData: Faculty[]
    venuesData: Venue[]
}

export default function GameEditForm(props: Props) {

    const router = useRouter();

    const { gameData: data, venuesData: Venues, facultiesData: Faculties } = props;
    const toast = useToast();
    const [updateGame, result] = useUpdateGameMutation();

    const dateTime = new Date(data.start);
    dateTime.setHours(dateTime.getHours() + 7);

    const initialValues = {
        id: data.id,
        venueId: data.venue.id,
        sportCode: data.sport.code,
        sportCategoryCode: data.sportCategory.code,
        start: dateTime.toISOString().slice(0, 16),
        type: data.type,
        status: data.status,
        participant: data.participant.map(participant => ({
            id: participant.id,
            facultyId: participant.facultyId,
            scoreType: participant.scoreType,
            value: participant.value,
            medal: participant.medal
        })),
        scoreType: data.participant[0].scoreType,
    }

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
            router.reload();
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
                    participants: values.participant.map(participant => ({
                        id: participant.id,
                        facultyId: Number(participant.facultyId),
                        scoreType: values.scoreType,
                        value: Number(participant.value),
                        medal: participant.medal ? participant.medal : null
                    })),
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
                                <Select id="type" onChange={handleChange}>
                                    {ROUND_TYPE.map(roundType => (
                                        <option key={roundType.value} value={roundType.value} selected={roundType.value === data.type}>{roundType.label}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="semibold"><Icon as={ImSortNumbericDesc} mr={1} />ประเภทการจัดอันดับ</FormLabel>
                                <Select id="scoreType" onChange={handleChange}>
                                    {SCORE_TYPE.map(scoreType => (
                                        <option key={scoreType.value} value={scoreType.value} selected={scoreType.value === values.scoreType}>{scoreType.label}</option>
                                    ))}
                                </Select>
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
                                            .sort((a, b) => a.value - b.value * (values.scoreType == "POINT" ? -1 : 1))
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
                                                                onChange={handleChange}
                                                            />
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
                        <Stack>
                            <Button type="submit" colorScheme="green" mt={5} isLoading={isSubmitting} loadingText="กำลังบันทึก"> <Icon as={AiTwotoneSave} mr={1} /> บันทึก</Button>
                            <Button type="button" colorScheme="pink" mt={5} isLoading={isSubmitting} loadingText="กำลังประกาศ" onClick={() => {
                                setFieldValue("status", "SCORED")
                                handleSubmit()
                            }}> <Icon as={AiTwotoneSave} mr={1} /> ประกาศผล</Button>
                        </Stack>
                    </Stack>
                </Form>
            )
            }

        </Formik >
    )


}