package com.deadpool.core.entity;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;


@Builder
@Getter
@Setter
@NoArgsConstructor
@ToString
public class ResponseTransfer {

    @ApiModelProperty(notes = "status text: \'ok\' or \'error\'")
    private String text;
    @ApiModelProperty(notes = "response: json string")
    private String response;

    public ResponseTransfer(String text) {
        this.text = text;
        this.response = "blank";
    }

    public ResponseTransfer(String text, String response) {
        this.text = text;
        this.response = response;
    }
}
