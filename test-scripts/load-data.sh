#!/usr/bin/env bash

aws kinesis put-record --stream-name test --partition-key `uuidgen` --data "Data={message: 'some message' }"