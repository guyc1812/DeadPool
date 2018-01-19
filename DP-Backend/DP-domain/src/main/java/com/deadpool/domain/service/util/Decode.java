package com.deadpool.domain.service.util;

import org.eclipse.egit.github.core.util.EncodingUtils;

import java.nio.charset.StandardCharsets;

/**
 * Created by yucgu on 2017/3/24.
 */
public class Decode {

    public String decodeContentISO(String contentEncoded) {
        return new String(EncodingUtils.fromBase64(contentEncoded), StandardCharsets.ISO_8859_1);
    }

    public String decodeContentUTF(String contentEncoded) {
        return new String(EncodingUtils.fromBase64(contentEncoded), StandardCharsets.UTF_8);
    }
}
