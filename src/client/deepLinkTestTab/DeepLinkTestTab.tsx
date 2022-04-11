import * as React from "react";
import { Provider, Flex, Text, Button, Header } from "@fluentui/react-northstar";
import { useState, useEffect } from "react";
import { useTeams } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";

/**
 * Implementation of the deepLinkTestTab content page
 */
export const DeepLinkTestTab = () => {

    const [{ inTeams, theme, context }] = useTeams();
    const [upn, setUpn] = useState<string | undefined>();

    const selectItems = [
        {
            value: "audio",
            name: "오디오"
        },
        {
            value: "video",
            name: "비디오"
        },
        {
            value: "pstn",
            name: "PSTN"
        }
    ];

    const [Selected, setSelected] = useState("audio");
    const [target, setTarget] = useState("");

    useEffect(() => {
        if (inTeams === true) {
            microsoftTeams.appInitialization.notifySuccess();
        } else {
            setUpn("Not in Microsoft Teams");
        }
    }, [inTeams]);

    useEffect(() => {
        if (context) {
            setUpn("caller: " + context.userPrincipalName);
        }
    }, [context]);

    const handleChangeSelect = (e) => {
        setSelected(e.target.value);
    };

    const handleTextChange = (e) => {
        setTarget(e.target.value);
    };

    const handleClickDeepLink = () => {
        const baseCallUrl = "msteams:/l/call/0/0";
        let callUrl;

        if (!target || !target.trim()) {
            alert("Input Callee Upn Or Phone Number");
            return;
        }

        if (Selected === "audio") {
            callUrl = baseCallUrl + `?users=${target}`;
        } else if (Selected === "video") {
            callUrl = baseCallUrl + `?users=${target}&withVideo=true`;
        } else if (Selected === "pstn") {

            callUrl = baseCallUrl + `?users=4:${target}`;
        }

        if (inTeams) {
            microsoftTeams.executeDeepLink(callUrl);
        } else {
            location.href = callUrl;
        }

    }

    /**
     * The render() method to create the UI of the tab
     */
    return (
        <Provider theme={theme}>
            <Flex fill={true} column styles={{
                padding: ".8rem 0 .8rem .5rem"
            }}>
                <Flex.Item>
                    <Header content="Teams Call DeepLink Test" />
                </Flex.Item>
                <Flex.Item>
                    <div>
                        <div>
                            <Text content={upn} />
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <input type="text" placeholder="입력" onChange={handleTextChange} value={target} />
                            <select onChange={handleChangeSelect} value={Selected}>
                                {selectItems.map((item) => (
                                    <option value={item.value} key={item.value}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <Button onClick={handleClickDeepLink}>Execute DeepLink</Button>
                        </div>
                    </div>
                </Flex.Item>
                <Flex.Item styles={{
                    padding: ".8rem 0 .8rem .5rem"
                }}>
                    <Text size="smaller" content="(C) Copyright pryaoh" />
                </Flex.Item>
            </Flex>
        </Provider>
    );
};
