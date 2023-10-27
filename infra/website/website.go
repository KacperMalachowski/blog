package website

import (
	cloudflare "github.com/pulumi/pulumi-cloudflare/sdk/v3/go/cloudflare"
	"github.com/pulumi/pulumi-gcp/sdk/v6/go/gcp/storage"
	"github.com/pulumi/pulumi-github/sdk/v5/go/github"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

type WebsiteInfrastructure struct {
	Bucket        *storage.Bucket
	DNSRecords    map[string]*cloudflare.Record
	ActionsSecret *github.ActionsSecret
}

func New(ctx *pulumi.Context, location, zoneID, repository string) (*WebsiteInfrastructure, error) {
	bucket, err := storage.NewBucket(ctx, "website", &storage.BucketArgs{
		Cors: storage.BucketCorArray{
			&storage.BucketCorArgs{
				MaxAgeSeconds: pulumi.Int(5),
				Methods: pulumi.StringArray{
					pulumi.String("GET"),
					pulumi.String("HEAD"),
				},
			},
		},
		ForceDestroy:             pulumi.Bool(false),
		Location:                 pulumi.String(location),
		UniformBucketLevelAccess: pulumi.Bool(true),
		Website: &storage.BucketWebsiteArgs{
			MainPageSuffix: pulumi.String("index.html"),
			NotFoundPage:   pulumi.String("index.html"),
		},
	})
	if err != nil {
		return nil, err
	}

	rootRecord, err := cloudflare.NewRecord(ctx, "website-root", &cloudflare.RecordArgs{
		ZoneId:  pulumi.String(zoneID),
		Name:    pulumi.String("@"),
		Value:   bucket.Url,
		Type:    pulumi.String("CNAME"),
		Proxied: pulumi.Bool(true),
	})
	if err != nil {
		return nil, err
	}

	wwwRecord, err := cloudflare.NewRecord(ctx, "website-www", &cloudflare.RecordArgs{
		ZoneId:  pulumi.String(zoneID),
		Name:    pulumi.String("www"),
		Value:   bucket.Url,
		Type:    pulumi.String("CNAME"),
		Proxied: pulumi.Bool(true),
	})
	if err != nil {
		return nil, err
	}

	actionsSecret, err := github.NewActionsSecret(ctx, "websiteBucketSecret", &github.ActionsSecretArgs{
		Repository:     pulumi.String(repository),
		SecretName:     pulumi.String("WEBSITE_BUCKET"),
		PlaintextValue: bucket.SelfLink,
	})

	return &WebsiteInfrastructure{
		Bucket: bucket,
		DNSRecords: map[string]*cloudflare.Record{
			"root": rootRecord,
			"www":  wwwRecord,
		},
		ActionsSecret: actionsSecret,
	}, nil
}
